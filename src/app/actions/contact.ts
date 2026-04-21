"use server"

import { contactSchema, type ContactInput } from "@/lib/validations/contact"
import { createClient } from "@/lib/supabase/server"
import { Resend } from "resend"

export async function submitContactForm(data: ContactInput) {
  try {
    // 1. Validate data
    const validatedData = contactSchema.parse(data)
    
    // 2. Insert into Supabase
    const supabase = await createClient()
    
    // Fallback: If SUPABASE URL isn't real/configured, skip DB entry to prevent crash during testing
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('dummy')) {
      const { error: dbError } = await supabase
        .from('contacts')
        .insert({
          name: validatedData.name,
          email: validatedData.email,
          message: validatedData.message,
        })
        
      if (dbError) {
        console.warn("Supabase insert skipped/failed:", dbError.message)
      }
    }

    // 3. Send email using Resend
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      const { error: emailError } = await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>', // You will need to verify a domain in Resend
        to: ['pranjal@example.com'], // Remember to change to your actual email
        subject: `New Contact Request from ${validatedData.name}`,
        text: `Name: ${validatedData.name}\nEmail: ${validatedData.email}\n\nMessage:\n${validatedData.message}`
      })
      
      if (emailError) throw new Error("Email provider error: " + emailError.message)
    } else {
      // Mock network latency for seamless dev preview if API key missing
      await new Promise(r => setTimeout(r, 1200))
    }

    return { success: true }
  } catch (error: unknown) {
    console.error("Contact Form Server Error:", error)
    return { error: error instanceof Error ? error.message : "An unexpected error occurred." }
  }
}
