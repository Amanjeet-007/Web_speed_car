const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const PRICE_MATRIX: Record<string, Record<string, number>> = {
  "silver wash": { "Hatchback": 400, "Sedan": 450, "Compact SUV": 550, "Full SUV": 600, "Luxury": 600 },
  "gold wash": { "Hatchback": 500, "Sedan": 600, "Compact SUV": 700, "Full SUV": 800, "Luxury": 800 },
  "platinum wash": { "Hatchback": 1400, "Sedan": 1600, "Compact SUV": 2000, "Full SUV": 2200, "Luxury": 2200 },
  "intensive internal cleaning": { "Hatchback": 1150, "Sedan": 1350, "Compact SUV": 1700, "Full SUV": 1800, "Luxury": 1800 },
  "wax rubbing and buffing": { "Hatchback": 1400, "Sedan": 1700, "Compact SUV": 2000, "Full SUV": 2200, "Luxury": 2200 },
  "teflon coating": { "Hatchback": 2500, "Sedan": 2800, "Compact SUV": 3200, "Full SUV": 3500, "Luxury": 3500 },
};

const ALLOWED_CATEGORIES = new Set(["Hatchback", "Sedan", "Compact SUV", "Full SUV", "Luxury"]);

function normalizeTitle(title: unknown) {
  return String(title ?? "").trim().toLowerCase().replace(/\s+/g, " ");
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function getSecret(name: string) {
  const value = Deno.env.get(name);
  if (!value) throw new Error(`${name} is not configured`);
  return value;
}

function supabaseHeaders() {
  const secretKeysRaw = Deno.env.get("SUPABASE_SECRET_KEYS");
  const serviceRole = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const secretKey = secretKeysRaw
    ? JSON.parse(secretKeysRaw)["default"]
    : serviceRole;

  if (!secretKey) throw new Error("Supabase secret key is not configured");

  return {
    apikey: secretKey,
    Authorization: `Bearer ${secretKey}`,
    "Content-Type": "application/json",
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  try {
    const body = await req.json();
    const { customer, date, timeSlot, items } = body ?? {};

    if (!customer?.fullName || !customer?.phone || !customer?.address) {
      return json({ error: "Name, phone and address are required." }, 400);
    }

    if (!date || !timeSlot) {
      return json({ error: "Appointment date and time slot are required." }, 400);
    }

    if (!Array.isArray(items) || items.length === 0 || items.length > 10) {
      return json({ error: "At least one valid service is required." }, 400);
    }

    const verifiedItems = items.map((item: any) => {
      const title = String(item?.title ?? "").trim();
      const category = String(item?.category ?? "").trim();
      const priceRow = PRICE_MATRIX[normalizeTitle(title)];

      if (!priceRow || !ALLOWED_CATEGORIES.has(category) || priceRow[category] === undefined) {
        throw new Error(`Invalid service or car category: ${title} / ${category}`);
      }

      return {
        title,
        category,
        price: priceRow[category],
        time: String(item?.time ?? ""),
      };
    });

    const subtotal = verifiedItems.reduce((sum, item) => sum + item.price, 0);
    const tax = Math.round(subtotal * 0.18);
    const total = subtotal + tax;
    const bookingReference = `SCW-${Date.now().toString(36).toUpperCase()}`;

    const razorpayKeyId = getSecret("RAZORPAY_KEY_ID");
    const razorpayKeySecret = getSecret("RAZORPAY_KEY_SECRET");
    const supabaseUrl = getSecret("SUPABASE_URL");

    const razorpayResponse = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(`${razorpayKeyId}:${razorpayKeySecret}`)}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: total * 100,
        currency: "INR",
        receipt: bookingReference,
        notes: {
          booking_reference: bookingReference,
          customer_phone: String(customer.phone),
        },
      }),
    });

    if (!razorpayResponse.ok) {
      const errorText = await razorpayResponse.text();
      console.error("Razorpay order error:", errorText);
      return json({ error: "Unable to create payment order." }, 502);
    }

    const razorpayOrder = await razorpayResponse.json();

    const insertResponse = await fetch(`${supabaseUrl}/rest/v1/bookings`, {
      method: "POST",
      headers: {
        ...supabaseHeaders(),
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        booking_reference: bookingReference,
        customer_name: String(customer.fullName).trim(),
        phone: String(customer.phone).trim(),
        email: customer.email ? String(customer.email).trim() : null,
        address: String(customer.address).trim(),
        preferred_date: date,
        preferred_time: timeSlot,
        items: verifiedItems,
        subtotal,
        tax,
        total,
        payment_method: "razorpay",
        payment_status: "created",
        booking_status: "pending_payment",
        razorpay_order_id: razorpayOrder.id,
      }),
    });

    if (!insertResponse.ok) {
      const errorText = await insertResponse.text();
      console.error("Supabase booking insert error:", errorText);
      return json({ error: "Payment order created but booking could not be saved. Please try again." }, 500);
    }

    const bookingRows = await insertResponse.json();
    const booking = bookingRows[0];

    return json({
      success: true,
      bookingId: booking.id,
      bookingReference,
      keyId: razorpayKeyId,
      order: {
        id: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
      },
      pricing: { subtotal, tax, total },
    });
  } catch (error) {
    console.error("create-razorpay-order error:", error);
    return json({ error: error instanceof Error ? error.message : "Unable to create payment order." }, 500);
  }
});
