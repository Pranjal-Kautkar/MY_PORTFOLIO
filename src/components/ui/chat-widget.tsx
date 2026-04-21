"use client"
import { useChat } from '@ai-sdk/react'
import { Button } from './button'
import { MessageCircle, Send, Loader2, Bot, User } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from './sheet'
import { Input } from './input'
import { ScrollArea } from './scroll-area'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat() as any
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="flex items-center justify-center bg-primary text-primary-foreground fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-2xl z-50 hover:scale-110 hover:shadow-primary/30 transition-all duration-300 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring">
        <MessageCircle className="w-8 h-8 group-hover:scale-110 transition-transform" />
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] flex flex-col h-full border-l border-border/50 shadow-2xl p-0">
        <SheetHeader className="p-6 border-b bg-muted/30">
          <SheetTitle className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            AI Portfolio Assistant
          </SheetTitle>
          <SheetDescription>
            Ask me anything about Pranjal&apos;s background or projects!
          </SheetDescription>
        </SheetHeader>
        
        <ScrollArea className="flex-1 p-6">
          <div className="flex flex-col gap-6">
            <AnimatePresence>
              {messages.length === 0 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center text-muted-foreground text-sm my-10 bg-muted/30 p-6 rounded-2xl border border-border/50">
                  <Bot className="w-10 h-10 mx-auto mb-4 text-muted-foreground opacity-50" />
                  Hi! I am Pranjal&apos;s AI assistant. Want to know what tech stack he prefers, or his availability for a new role?
                </motion.div>
              )}
              
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {messages.map((m: any) => (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  key={m.id} 
                  className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  <div className={`p-4 rounded-2xl max-w-[85%] text-sm shadow-sm ${m.role === 'user' ? 'bg-primary text-primary-foreground rounded-tr-sm' : 'bg-muted rounded-tl-sm border border-border/50'}`}>
                    {m.content}
                  </div>
                  {m.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-secondary border border-border/50 flex items-center justify-center shrink-0">
                      <User className="w-4 h-4 text-secondary-foreground" />
                    </div>
                  )}
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <Loader2 className="w-4 h-4 text-primary animate-spin" />
                  </div>
                  <div className="p-4 rounded-2xl bg-muted rounded-tl-sm border border-border/50 flex items-center gap-1.5 h-[52px]">
                    <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={scrollRef} />
          </div>
        </ScrollArea>
        
        <div className="p-6 border-t bg-background/50 backdrop-blur-md mt-auto">
          <form onSubmit={handleSubmit} className="flex gap-2 relative">
            <Input 
              value={input || ''}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-1 rounded-full px-6 bg-muted/50 border-border/50 focus-visible:ring-primary h-12 pr-12 shadow-sm"
            />
            <Button type="submit" size="icon" disabled={isLoading || !(input || '').trim()} className="absolute right-1 top-1 rounded-full shrink-0 w-10 h-10 shadow-sm">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  )
}
