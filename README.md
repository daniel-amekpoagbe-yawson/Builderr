# Buildrr – Section-Based Portfolio Builder 🚀

**Buildrr** is a modern, professional, and production-ready portfolio builder web application that empowers anyone to quickly create, customize, and deploy beautiful online portfolios. Build curated portfolios using pre-designed sections with multiple visual variants—no coding required.

---

## ✨ Key Features

- **Multiple Section Variants** — Choose from a library of professionally designed layouts for each section type.
- **Intuitive Drag & Drop** — Reorder sections and organize your portfolio effortlessly.
- **Theme Customization** — Light & dark modes, plus flexible color and font choices.
- **Instant Publishing** — Get a live public URL for your portfolio with one click.
- **HTML Export** — Download your portfolio as a standalone HTML file for self-hosting or offline use.
- **Auto-Save** — Your changes are saved automatically every 3 seconds—never lose your progress.
- **Secure Authentication** — Powered by Supabase Auth for safe, passwordless login.
- **Responsive Design** — Looks amazing on all screens: desktop, tablet, and mobile.
- **Image Uploads** — Drag & drop image uploads, with built-in compression and preview.

---

## 🛠️ Tech Stack

- **Frontend:** React 18+ + TypeScript
- **Routing:** TanStack Router
- **State Management:** Zustand
- **Styling:** Tailwind CSS
- **Auth & Database:** Supabase (PostgreSQL) + Supabase Auth
- **Build Tool:** Vite
- **Package Manager:** [Bun](https://bun.sh) 🍞

---

## 🚦 Getting Started

### Prerequisites

- Node.js v18+ and [Bun](https://bun.sh)
- A [Supabase](https://supabase.com) account & project

### Installation

1. **Clone the repository**
    ```bash
    git clone <repository-url>
    cd Builderr
    ```

2. **Install dependencies**
    ```bash
    bun install
    ```

3. **Configure environment variables**

    Create a `.env` file in the project root:
    ```bash
    touch .env
    ```

    Add your Supabase credentials:
    ```env
    VITE_SUPABASE_URL=your_supabase_project_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

    - **Where to find these?**
        1. Open your [Supabase Dashboard](https://app.supabase.com)
        2. Select or create a project
        3. Go to **Settings → API**
        4. Copy the "Project URL" and "anon/public" key

4. **Set up the database**

    In your [Supabase SQL Editor](https://app.supabase.com/project/_/sql):
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

    -- Enable Row Level Security
    ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;

    -- Policies: users manage their own portfolios
    CREATE POLICY "Users can view own portfolios" ON portfolios
      FOR SELECT USING (auth.uid() = user_id);

    CREATE POLICY "Users can insert own portfolios" ON portfolios
      FOR INSERT WITH CHECK (auth.uid() = user_id);

    CREATE POLICY "Users can update own portfolios" ON portfolios
      FOR UPDATE USING (auth.uid() = user_id);

    CREATE POLICY "Users can delete own portfolios" ON portfolios
      FOR DELETE USING (auth.uid() = user_id);

    -- Public access for published portfolios
    CREATE POLICY "Published portfolios are publicly viewable" ON portfolios
      FOR SELECT USING (is_published = true);
    ```

5. **Set up Supabase Storage** (for images)

    For detailed image storage instructions, see [`SUPABASE_STORAGE_SETUP.md`](./SUPABASE_STORAGE_SETUP.md), or run this in Supabase SQL:
    ```sql
    -- Create storage bucket
    INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
    VALUES (
      'portfolio-images',
      'portfolio-images',
      true,
      5242880,
      ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    );

    -- Allow authenticated users to upload
    CREATE POLICY "Users can upload images"
    ON storage.objects FOR INSERT TO authenticated
    WITH CHECK (bucket_id = 'portfolio-images' AND (storage.foldername(name))[1] = auth.uid()::text);

    -- Allow public image access
    CREATE POLICY "Public image access"
    ON storage.objects FOR SELECT TO public
    USING (bucket_id = 'portfolio-images');
    ```

6. **Start the development server**
    ```bash
    bun run dev
    ```

    Visit [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
src/
├── components/        # Reusable React components
│   ├── builder/      # Builder interface UI
│   └── sections/     # Portfolio section modules
├── routes/           # TanStack router routes
├── store/            # Zustand state management
├── services/         # API/data access layer
├── interfaces/       # TypeScript types/interfaces
└── libs/             # Utilities/helpers
```

---

## 📜 Scripts

- `bun run dev` – Start development server
- `bun run build` – Build for production
- `bun run preview` – Preview production build locally
- `bun run lint` – Lint code with ESLint
- `bun run format` – Format code with Prettier
- `bun run check` – Format & lint

---

## 🧩 Section Types & Variants

**Hero:**  
- Variant A — Centered, bold heading  
- Variant B — Split layout with image  
- Variant C — Full-width, background overlay

**Projects:**  
- Variant A — Grid (2–3 columns)  
- Variant B — Alternating layouts

**Skills:**  
- Variant A — Tags/Pills  
- Variant B — Progress bars

**About:**  
- Two-column layout with bio & image

**Experience:**  
- Timeline with company, role, dates

**Contact:**  
- Contact form & social links

---

## 🚀 Usage Guide

1. **Sign up/Login:** Create an account or sign in with Supabase Auth.
2. **Create portfolio:** Start your project from the dashboard.
3. **Add sections:** Use the sidebar to add and reorder portfolio sections.
4. **Configure:** Select a section to edit its content and switch variants.
5. **Theme:** Adjust colors, fonts, and toggle light/dark modes.
6. **Preview:** Review your portfolio fullscreen.
7. **Publish:** Get a public URL instantly.
8. **Export:** Download your site as HTML for offline or external hosting.

---

## 🌍 Open Source & Community

Buildrr is now **public and open for collaboration**!  
Contributions are welcome—check out the [issues](https://github.com/daniel-amekpoagbe-yawson/Builderr/issues), open pull requests, or suggest new features.

Want to help? Read our [CONTRIBUTING.md](./CONTRIBUTING.md) (coming soon!) and join the project.

---

## 🔑 Environment Variables

- `VITE_SUPABASE_URL` — Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` — Your Supabase anon key

---


