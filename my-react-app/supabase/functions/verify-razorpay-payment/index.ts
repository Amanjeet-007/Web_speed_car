const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

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

function toHex(buffer: ArrayBuffer) {
  return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function hmacSha256(secret: string, message: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return toHex(signature);
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return result === 0;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  try {
    const body = await req.json();
    const {
      bookingId,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    } = body ?? {};

    if (!bookingId || !razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return json({ error: "Payment verification details are incomplete." }, 400);
    }

    const supabaseUrl = getSecret("SUPABASE_URL");
    const razorpaySecret = getSecret("RAZORPAY_KEY_SECRET");
    const headers = supabaseHeaders();

    const bookingResponse = await fetch(
      `${supabaseUrl}/rest/v1/bookings?id=eq.${encodeURIComponent(bookingId)}&select=*`,
      { headers },
    );

    if (!bookingResponse.ok) {
      console.error("Booking lookup failed:", await bookingResponse.text());
      return json({ error: "Unable to verify booking." }, 500);
    }

    const bookings = await bookingResponse.json();
    const booking = bookings[0];

    if (!booking) return json({ error: "Booking not found." }, 404);
    if (booking.razorpay_order_id !== razorpay_order_id) {
      return json({ error: "Payment order does not match this booking." }, 400);
    }

    if (booking.payment_status === "paid" && booking.razorpay_payment_id === razorpay_payment_id) {
      return json({
        success: true,
        bookingReference: booking.booking_reference,
        message: "Payment already verified.",
      });
    }

    const generatedSignature = await hmacSha256(
      razorpaySecret,
      `${booking.razorpay_order_id}|${razorpay_payment_id}`,
    );

    if (!safeEqual(generatedSignature, razorpay_signature)) {
      return json({ error: "Payment signature verification failed." }, 400);
    }

    const updateResponse = await fetch(
      `${supabaseUrl}/rest/v1/bookings?id=eq.${encodeURIComponent(bookingId)}`,
      {
        method: "PATCH",
        headers: { ...headers, Prefer: "return=minimal" },
        body: JSON.stringify({
          razorpay_payment_id,
          payment_status: "paid",
          booking_status: "confirmed",
        }),
      },
    );

    if (!updateResponse.ok) {
      console.error("Booking update failed:", await updateResponse.text());
      return json({ error: "Payment verified but booking update failed. Please contact support." }, 500);
    }

    const paymentResponse = await fetch(`${supabaseUrl}/rest/v1/payments`, {
      method: "POST",
      headers: { ...headers, Prefer: "return=minimal" },
      body: JSON.stringify({
        booking_id: bookingId,
        razorpay_order_id: booking.razorpay_order_id,
        razorpay_payment_id,
        amount: booking.total,
        currency: "INR",
        status: "paid",
        signature: razorpay_signature,
      }),
    });

    if (!paymentResponse.ok) {
      console.error("Payment audit insert failed:", await paymentResponse.text());
      // Booking is already confirmed after successful signature verification.
      // Keep the customer-facing result successful and retain the server log for follow-up.
    }

    return json({
      success: true,
      bookingReference: booking.booking_reference,
      message: "Payment verified and booking confirmed.",
    });
  } catch (error) {
    console.error("verify-razorpay-payment error:", error);
    return json({ error: "Unable to verify payment right now." }, 500);
  }
});
