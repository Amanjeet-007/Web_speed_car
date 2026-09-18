# Speed Car Wash - Payment Setup

## Already completed in Supabase

- `bookings` table
- `payments` table
- `create-razorpay-order` Edge Function
- `verify-razorpay-payment` Edge Function
- Razorpay secrets in Supabase Edge Function secrets

Do not put `RAZORPAY_KEY_SECRET` in the React `.env` file.

## Frontend environment

Create `.env` in the project root:

```env
VITE_SUPABASE_URL=https://rjncwixoopxtztsgdymq.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_OR_PUBLISHABLE_KEY
```

## Install and run

```bash
npm install
npm run dev
```

## Payment flow

1. Cart is persisted in browser `localStorage` under `speed_car_wash_cart`.
2. Checkout calls `create-razorpay-order`.
3. Razorpay Checkout opens for UPI / Card / NetBanking.
4. Successful payment calls `verify-razorpay-payment`.
5. Verified payment confirms the booking and writes the payment audit record.
6. Customer sees a receipt screen with a Print/Save option and a pre-filled WhatsApp details button.

## WhatsApp

The WhatsApp button uses the customer's entered phone number and opens WhatsApp with a pre-filled message. The customer still presses **Send**. No WhatsApp Business API is required for this flow.

## Receipt

The **Save / Print Receipt** button opens the browser print dialog. The customer can choose **Save as PDF** from the print dialog.
