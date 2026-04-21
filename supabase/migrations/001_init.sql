-- Migration: 001_init.sql

-- 1. Create table for Projects
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    tags TEXT[],
    github_url TEXT,
    live_url TEXT,
    thumbnail_url TEXT,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create table for Contacts
CREATE TABLE contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create table for Posts (Blog)
CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    body TEXT,
    views INT DEFAULT 0,
    published_at TIMESTAMPTZ
);

-- 4. Create table for Site Stats
CREATE TABLE stats (
    id INT PRIMARY KEY DEFAULT 1,
    visitors INT DEFAULT 0
);

-- Insert the default stats row so it can be updated
INSERT INTO stats (id, visitors) VALUES (1, 0)
ON CONFLICT (id) DO NOTHING;

-- 5. RPC Functions to prevent race conditions

-- Safely increment site visitors
CREATE OR REPLACE FUNCTION increment_visitors()
RETURNS void AS $$
BEGIN
    UPDATE stats 
    SET visitors = visitors + 1 
    WHERE id = 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Safely increment post views by slug
CREATE OR REPLACE FUNCTION increment_post_views(post_slug TEXT)
RETURNS void AS $$
BEGIN
    UPDATE posts 
    SET views = views + 1 
    WHERE slug = post_slug;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
