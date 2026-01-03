# Buildrr - Section-Based Portfolio Builder

A professional, production-ready portfolio builder web application that allows users to create, customize, and deploy portfolios using pre-designed section layouts with multiple visual variants.

## Features

- 🎨 **Multiple Section Variants** - Choose from professionally designed variants for each section type
- 🎯 **Drag & Drop Reordering** - Easily reorder sections with intuitive drag-and-drop
- 🎨 **Theme Customization** - Light/dark mode, custom colors, and font selection
- 🚀 **Instant Publishing** - Get a public URL instantly when you publish
- 📥 **HTML Export** - Download your portfolio as a standalone HTML file
- 💾 **Auto-Save** - Changes are automatically saved every 3 seconds
- 🔐 **Secure Authentication** - Built with Supabase Auth
- 📱 **Responsive Design** - Works beautifully on all devices
- 📷 **Image Upload** - Drag & drop image uploads with compression and preview

## Tech Stack

- **Frontend**: React 18+ with TypeScript
- **Routing**: TanStack Router
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account and project

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Buildrr
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create .env file in the root directory
touch .env
```

Edit `.env` and add your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Where to find your Supabase credentials:**
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project (or create a new one)
3. Go to Settings → API
4. Copy the "Project URL" and "anon/public" key

4. Set up the Supabase database:

Run this SQL in your Supabase SQL editor:

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

5. Set up Supabase Storage for image uploads:

See [SUPABASE_STORAGE_SETUP.md](./SUPABASE_STORAGE_SETUP.md) for detailed instructions, or run this quick setup:

```sql
-- Create the storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'portfolio-images',
  'portfolio-images',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
);

-- Allow authenticated users to upload to their folder
CREATE POLICY "Users can upload images"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'portfolio-images' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Allow public viewing of images
CREATE POLICY "Public image access"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'portfolio-images');
```

6. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Project Structure

```
src/
├── components/          # React components
│   ├── builder/        # Builder interface components
│   └── sections/       # Portfolio section components
├── routes/             # TanStack Router routes
├── store/              # Zustand stores
├── services/           # API service layer
├── interfaces/         # TypeScript type definitions
└── libs/               # Utility libraries
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run check` - Format and lint

## Section Types

### Hero Section
- **Variant A**: Centered layout with large heading
- **Variant B**: Split layout with image
- **Variant C**: Full-width background with overlay

### Projects Section
- **Variant A**: Grid layout (2-3 columns)
- **Variant B**: Alternating left-right layout

### Skills Section
- **Variant A**: Category-based tags/pills
- **Variant B**: Progress bars with skill levels

### About Section
- Two-column layout with image and bio

### Experience Section
- Timeline layout with company, role, dates

### Contact Section
- Contact form + social links

## Usage

1. **Sign Up/Login**: Create an account or sign in
2. **Create Portfolio**: Click "Create New Portfolio" from the dashboard
3. **Add Sections**: Use the left sidebar to add sections to your portfolio
4. **Configure**: Select a section to configure its content and variant
5. **Customize Theme**: Adjust colors, fonts, and theme mode
6. **Preview**: Click "Preview" to see your portfolio in full-screen
7. **Publish**: Click "Publish" to get a public URL
8. **Export**: Download as HTML for offline use

## Environment Variables

- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.
