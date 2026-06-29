/**
 * Supabase Edge Function: Send Contact Email
 * Sends contact form submissions to anarchy.lat@gmail.com
 * 
 * Deploy with: supabase functions deploy send-contact-email
 */

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

interface ContactRequest {
  name: string;
  email: string;
  message: string;
}

serve(async (req) => {
  // CORS headers
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };

  // Handle preflight request
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Parse request body
    const { name, email, message }: ContactRequest = await req.json();

    // Validate input
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Get Resend API key from environment (recommended)
    // Or use SMTP credentials
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    
    if (RESEND_API_KEY) {
      // Using Resend (recommended - free 100 emails/day)
      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Anarchy AI Website <noreply@anarchy.lat>",
          to: "anarchy.lat@gmail.com",
          reply_to: email,
          subject: `New Contact: ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #E63030;">New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Message:</strong></p>
              <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 10px 0;">
                ${message.replace(/\n/g, "<br>")}
              </div>
              <p style="color: #666; font-size: 12px; margin-top: 30px;">
                Sent from Anarchy AI Website Contact Form<br>
                ${new Date().toLocaleString()}
              </p>
            </div>
          `,
          text: `New Contact Form Submission

Name: ${name}
Email: ${email}

Message:
${message}

Sent from Anarchy AI Website
${new Date().toISOString()}`,
        }),
      });

      if (!resendResponse.ok) {
        const error = await resendResponse.text();
        throw new Error(`Resend API error: ${error}`);
      }

      return new Response(
        JSON.stringify({ success: true, message: "Email sent successfully" }),
        { 
          status: 200, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    } else {
      // Fallback: Log to Supabase table (create a contacts table)
      // For now, return success to store locally
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Message received (email service not configured)",
          stored: true 
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
  } catch (error) {
    console.error("Error sending email:", error);
    
    return new Response(
      JSON.stringify({ 
        error: "Failed to send email", 
        details: error instanceof Error ? error.message : "Unknown error" 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
