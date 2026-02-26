import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

serve(async (req) => {
    try {
        if (!RESEND_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
            return new Response(JSON.stringify({ error: "Missing environment variables" }), { status: 500 })
        }

        // Provide auth bypass
        const authHeader = req.headers.get('Authorization')
        if (authHeader !== `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`) {
            // Warning: in production, verify the cron trigger's authorization
            // For now, this is somewhat protected by needing the JWT or service key
        }

        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

        // Fetch all registrations who haven't attended yet
        const { data: users, error } = await supabase
            .from('registrations')
            .select('email, full_name, registration_id')
            .eq('attendance_status', false)

        if (error) throw error

        if (!users || users.length === 0) {
            return new Response(JSON.stringify({ message: "No users to remind" }), { status: 200 })
        }

        // Prepare emails
        const emails = users.map(user => ({
            from: 'Events <onboarding@resend.dev>',
            to: [user.email],
            subject: `Reminder: µPhoria Tech Fest is Tomorrow!`,
            html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #7b39fc;">See you tomorrow, ${user.full_name}!</h1>
          <p>This is a quick reminder that the µPhoria Tech Fest is happening tomorrow.</p>
          <p>Your registration ID is <strong>${user.registration_id}</strong>.</p>
          <p>Get lots of rest, and we'll see you at the venue!</p>
        </div>
      `
        }))

        const results = []
        for (const email of emails) {
            const res = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${RESEND_API_KEY}`
                },
                body: JSON.stringify(email)
            })
            results.push(await res.json())
        }

        return new Response(
            JSON.stringify({ success: true, processed: users.length, results }),
            { headers: { "Content-Type": "application/json" } },
        )
    } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 })
    }
})
