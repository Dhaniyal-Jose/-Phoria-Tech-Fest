import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

serve(async (req) => {
  try {
    const payload = await req.json();
    
    // Validate payload from Supabase Webhook
    if (!payload.record || !payload.record.email) {
       return new Response(JSON.stringify({ error: "No email provided or invalid payload" }), { status: 400 });
    }

    const record = payload.record;

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set.");
      return new Response(JSON.stringify({ error: "Server configuration error" }), { status: 500 });
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Events <onboarding@resend.dev>',
        to: [record.email],
        subject: `Registration Confirmed: ${record.registration_id}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #7b39fc;">You're successfully registered, ${record.full_name}!</h1>
            <p>Thank you for registering for the µPhoria Tech Fest.</p>
            <p>Your unique registration ID is <strong>${record.registration_id}</strong>.</p>
            <p>Please keep this ID handy for check-in on the day of the event.</p>
            <br/>
            <p>We are excited to see you there!</p>
          </div>
        `
      })
    });

    const data = await res.json();

    return new Response(
      JSON.stringify({ success: true, resendData: data }),
      { headers: { "Content-Type": "application/json" } },
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
});
