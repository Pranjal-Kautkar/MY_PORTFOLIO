-- Seed 3 fake projects into the Supabase database

INSERT INTO projects (title, description, tags, github_url, live_url, thumbnail_url, featured)
VALUES
(
    'NextGen E-Commerce',
    'A high-performance modern e-commerce platform built with Next.js App Router, Stripe integration, and Supabase backend.',
    ARRAY['Next.js', 'React', 'Tailwind CSS', 'Supabase', 'Stripe'],
    'https://github.com/pranjal/ecommerce',
    'https://ecommerce-demo.vercel.app',
    'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2000&auto=format&fit=crop',
    true
),
(
    'AI Content Generator',
    'An intelligent application leveraging OpenAI API to generate marketing copy, blog posts, and SEO metadata.',
    ARRAY['TypeScript', 'OpenAI', 'Vercel AI SDK', 'shadcn/ui'],
    'https://github.com/pranjal/ai-content-gen',
    'https://ai-generator.vercel.app',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop',
    true
),
(
    'Real-time Chat Application',
    'A real-time messaging app featuring channels, direct messages, and presence indicators using Supabase Realtime.',
    ARRAY['React', 'Supabase Realtime', 'Zustand', 'Framer Motion'],
    'https://github.com/pranjal/chat-app',
    NULL,
    'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2000&auto=format&fit=crop',
    false
) ON CONFLICT DO NOTHING;
