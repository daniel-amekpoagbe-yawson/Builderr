# Quick Start Guide for Testing Buildrr

This guide will help you get Buildrr up and running quickly so people can start testing it.

## 🚀 Quick Setup (5 minutes)

### 1. Prerequisites
- Node.js 18+ installed
- A Supabase account (free tier works fine)

### 2. Clone and Install
```bash
git clone <your-repo-url>
cd Buildrr
npm install
```

### 3. Set Up Supabase

#### Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in project details (name, database password, region)
4. Wait for project to be created (~2 minutes)

#### Get Your Credentials
1. In your Supabase project, go to **Settings** → **API**
2. Copy the **Project URL** (looks like: `https://xxxxx.supabase.co`)
3. Copy the **anon/public** key (long JWT token)

#### Create Environment File
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4. Set Up Database

1. In Supabase, go to **SQL Editor**
2. Run this SQL to create the portfolios table:

```sql
-- Portfolios table
CREATE TABLE portfolios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  config JSONB NOT NULL,
  slug TEXT UNIQUE,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;

-- Users can only access their own portfolios
CREATE POLICY "Users can view own portfolios" ON portfolios
  FOR SELECT USING (auth.uid() = user_id);
  
CREATE POLICY "Users can insert own portfolios" ON portfolios
  FOR INSERT WITH CHECK (auth.uid() = user_id);
  
CREATE POLICY "Users can update own portfolios" ON portfolios
  FOR UPDATE USING (auth.uid() = user_id);
  
CREATE POLICY "Users can delete own portfolios" ON portfolios
  FOR DELETE USING (auth.uid() = user_id);

-- Public portfolios can be viewed by anyone
CREATE POLICY "Published portfolios are publicly viewable" ON portfolios
  FOR SELECT USING (is_published = true);
```

### 5. Set Up Image Storage

1. In Supabase, go to **Storage**
2. Click **Create Bucket**
3. Name it: `portfolio-images`
4. Make it **Public**
5. Click **Create Bucket**

Then run this SQL in the SQL Editor:

```sql
-- Allow authenticated users to upload to their folder
CREATE POLICY "Users can upload images"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'portfolio-images' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Allow public viewing of images
CREATE POLICY "Public image access"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'portfolio-images');
```

### 6. Run the App

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## ✅ Testing Checklist

### Basic Functionality
- [ ] Sign up with a new account
- [ ] Create a new portfolio from template
- [ ] Add sections to portfolio
- [ ] Configure section content
- [ ] Upload images
- [ ] Change theme colors
- [ ] Preview portfolio
- [ ] Publish portfolio
- [ ] View published portfolio at public URL
- [ ] Edit published portfolio
- [ ] Delete portfolio (with confirmation)

### Error Handling
- [ ] Try accessing a non-existent portfolio
- [ ] Try invalid form inputs
- [ ] Check error messages are user-friendly

### User Experience
- [ ] Test on mobile device
- [ ] Test drag & drop section reordering
- [ ] Test auto-save functionality
- [ ] Test image upload with different formats

## 🐛 Common Issues

### "Failed to load module script" on Vercel
- ✅ Fixed! The `vercel.json` has been updated to properly handle static assets.

### "Manifest.json syntax error"
- ✅ Fixed! The manifest.json file is now properly configured.

### Images not uploading
- Check that the storage bucket is created and policies are set
- Verify your Supabase credentials in `.env`
- Check browser console for errors

### Can't sign up/login
- Make sure Supabase Auth is enabled (it is by default)
- Check that your Supabase URL and key are correct in `.env`
- Restart the dev server after changing `.env`

## 📝 Notes for Testers

- **Auto-save**: Changes are saved automatically every 3 seconds
- **Publishing**: Creates a public URL that anyone can view
- **Templates**: Start with a template to see example content
- **Sections**: You can add multiple sections of the same type
- **Theme**: Customize colors, fonts, and dark/light mode

## 🎯 What to Test

Focus on:
1. **Ease of use** - Can users create a portfolio without reading docs?
2. **Error handling** - Are errors clear and helpful?
3. **Performance** - Does it feel fast and responsive?
4. **Mobile experience** - Does it work well on phones?
5. **Edge cases** - What happens with empty fields, long text, etc.?

## 📧 Feedback

Report issues or feedback through:
- GitHub Issues
- Email
- In-app feedback (if implemented)

---

**Happy Testing! 🚀**

