import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

Deno.serve(async (req) => {
  try {
    const payload = await req.json();
    const record = payload.record;

    if (!record || !record.email) {
      return new Response(JSON.stringify({ error: "No email provided" }), { status: 400 });
    }

    // Generate QR Code URL via QuickChart API
    const qrCodeUrl = `https://quickchart.io/qr?text=${encodeURIComponent(record.id)}&size=200&light=ffffff&dark=7b39fc`;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev', // DO NOT CHANGE THIS until you verify a domain
        to: [record.email],
        subject: `Pass for µPhoria Tech Fest: ${record.full_name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; background-color: #121212; color: #ffffff; border-radius: 20px;">
            <div style="text-align: center; margin-bottom: 20px;">
              <h1 style="color: #7b39fc; margin: 0;">µPhoria</h1>
              <p style="color: #888; margin: 5px 0;">Official Digital Pass</p>
            </div>
            
            <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 15px; margin-bottom: 25px;">
              <p style="margin: 5px 0;"><strong>Attendee:</strong> ${record.full_name}</p>
              <p style="margin: 5px 0;"><strong>College:</strong> ${record.college || 'N/A'}</p>
              <p style="margin: 5px 0;"><strong>Event:</strong> ${record.selected_event || 'General'}</p>
            </div>

            <div style="text-align: center; background: #ffffff; padding: 20px; border-radius: 15px;">
              <p style="color: #000; font-weight: bold; margin-bottom: 10px;">YOUR CHECK-IN QR CODE</p>
              <img src="${qrCodeUrl}" alt="Check-in QR Code" width="200" style="display: block; margin: 0 auto;" />
              <p style="color: #666; font-size: 10px; margin-top: 10px; font-family: monospace;">ID: ${record.id}</p>
            </div>

            <p style="text-align: center; font-size: 12px; color: #666; margin-top: 25px;">
              Present this QR code at the registration desk. <br/>
              © 2026 µPhoria Tech Fest
            </p>
          </div>
        `
      })
    });

    const result = await res.json();
    return new Response(JSON.stringify(result), { headers: { "Content-Type": "application/json" } });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
});
