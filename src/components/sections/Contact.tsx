"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { contactSchema, type ContactInput } from "@/lib/validations/contact"
import { submitContactForm } from "@/app/actions/contact"
import { toast } from "sonner"
import { motion } from "framer-motion"
import { Mail, Send, Loader2, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

export function Contact() {
  const [isPending, setIsPending] = useState(false)

  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  async function onSubmit(data: ContactInput) {
    setIsPending(true)
    try {
      const result = await submitContactForm(data)
      
      if (result.error) {
        toast.error("Failed to send message", {
          description: result.error,
        })
      } else {
        toast.success("Message sent successfully!", {
          description: "Thank you for reaching out. I'll get back to you soon.",
          icon: <Sparkles className="w-5 h-5 text-yellow-500" />
        })
        form.reset()
      }
    } catch {
      toast.error("An unexpected error occurred.")
    } finally {
      setIsPending(false)
    }
  }

  return (
    <section id="contact" className="py-24 bg-background relative overflow-hidden">
      {/* Mesh gradient artifact */}
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="container px-4 mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Let&apos;s Work Together</h2>
          <p className="text-muted-foreground text-lg cursor-default">
            Have a project in mind or want to discuss opportunities? I&apos;d love to hear from you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-card/50 backdrop-blur-md border border-border/50 rounded-3xl p-6 md:p-10 shadow-sm"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" disabled={isPending} {...field} className="h-12 bg-muted/50 rounded-xl focus-visible:ring-primary" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="hello@example.com" type="email" disabled={isPending} {...field} className="h-12 bg-muted/50 rounded-xl focus-visible:ring-primary" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell me about your project..."
                        className="resize-none min-h-[160px] bg-muted/50 rounded-xl focus-visible:ring-primary p-4"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isPending} className="w-full h-12 rounded-xl text-lg font-medium shadow-sm transition-all hover:scale-[1.02]">
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" /> Send Message
                  </>
                )}
              </Button>
            </form>
          </Form>
        </motion.div>
      </div>
    </section>
  )
}
