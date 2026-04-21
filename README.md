# Advanced Agentic Portfolio

A premium, production-ready personal developer portfolio built with the latest App Router ecosystem.

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router) + React 19
- **Database**: Supabase (Postgres)
- **Styling**: Tailwind CSS v4 + Framer Motion
- **AI Integration**: Vercel AI SDK + Google Gemini
- **Forms**: React Hook Form + Zod + Resend
- **UI Components**: shadcn/ui

## 📦 Local Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Copy the example environment file and insert your keys:
   ```bash
   cp .env.example .env.local
   ```
   *Note: If API keys are omitted during development, the application natively falls back to simulated/mock responses so the UI never crashes!*

3. **Supabase Setup**
   Run the SQL provided in `/supabase/migrations/001_init.sql` directly inside the Supabase SQL Editor to schema your Database tables and RPC configs.
   Next, run the `/supabase/seed.sql` chunk to prepopulate 3 awesome Mock Projects!

4. **Start the Dev Server**
   ```bash
   npm run dev
   ```

## 🌐 Deploy to Vercel

1. Push your repository to GitHub.
2. Visit [Vercel](https://vercel.com/new) and import your Git Repository.
3. Once imported, drop the 4 environment variables into Vercel's Environment Variables setting panel before clicking **Deploy**.
   * `NEXT_PUBLIC_SUPABASE_URL`
   * `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   * `GOOGLE_GENERATIVE_AI_API_KEY` (Generate at [Google AI Studio](https://aistudio.google.com/app/apikey))
   * `RESEND_API_KEY`
4. Enjoy!
