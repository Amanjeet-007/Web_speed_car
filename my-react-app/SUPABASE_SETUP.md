# Supabase setup

This frontend now submits website enquiries directly to Supabase. No separate Express backend is required.

## 1. Create the table
Open Supabase Dashboard -> SQL Editor and run `supabase/schema.sql`.

The same table receives submissions from:
- Home -> Get In Touch (`source = home-get-in-touch`)
- Floating Enquire widget (`source = floating-enquiry-widget`)
- Contact Us form (`source = contact-us`)

## 2. Add local environment variables
Create a `.env` file in this `my-react-app` folder:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

Use the project's public/anon key only. Never put a Supabase service-role key in the frontend.

## 3. Run

```bash
npm install
npm run dev
```

## 4. Netlify
Add the same two variables in Netlify -> Site configuration -> Environment variables, then redeploy.
