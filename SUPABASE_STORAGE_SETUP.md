# Supabase Storage Setup for Image Uploads

This guide explains how to set up Supabase Storage for the image upload feature in Buildrr.

## Quick Setup

### 1. Create the Storage Bucket

Run this SQL in your Supabase SQL Editor (Dashboard → SQL Editor → New Query):

```sql
-- Create the storage bucket for portfolio images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'portfolio-images',
  'portfolio-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
```

### 2. Set Up Storage Policies (RLS)

Run these SQL commands to set up Row Level Security policies:

```sql
-- Allow authenticated users to upload images to their own folder
CREATE POLICY "Users can upload images to own folder"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'portfolio-images' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to update/replace their own images
CREATE POLICY "Users can update own images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'portfolio-images' AND
  (storage.foldername(name))[1] = auth.uid()::text
)
WITH CHECK (
  bucket_id = 'portfolio-images' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to delete their own images
CREATE POLICY "Users can delete own images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'portfolio-images' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow anyone to view images (they're public for portfolios)
CREATE POLICY "Anyone can view portfolio images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'portfolio-images');
```

## Alternative: Manual Setup via Supabase Dashboard

If you prefer using the Supabase Dashboard UI:

### Step 1: Create Bucket
1. Go to **Storage** in your Supabase Dashboard
2. Click **New Bucket**
3. Enter bucket name: `portfolio-images`
4. ✅ Check **Public bucket**
5. Set file size limit: `5MB`
6. Set allowed MIME types: `image/jpeg, image/png, image/gif, image/webp`
7. Click **Create bucket**

### Step 2: Configure Policies
1. Click on the `portfolio-images` bucket
2. Go to **Policies** tab
3. Add the following policies:

**Policy 1: Upload (INSERT)**
- Name: `Users can upload images to own folder`
- Target roles: `authenticated`
- Policy definition: `(storage.foldername(name))[1] = auth.uid()::text`

**Policy 2: Update**
- Name: `Users can update own images`
- Target roles: `authenticated`
- Policy definition: `(storage.foldername(name))[1] = auth.uid()::text`

**Policy 3: Delete**
- Name: `Users can delete own images`
- Target roles: `authenticated`
- Policy definition: `(storage.foldername(name))[1] = auth.uid()::text`

**Policy 4: View (SELECT)**
- Name: `Anyone can view portfolio images`
- Target roles: `public` (anon)
- Policy definition: `true`

## File Structure

Images are stored with the following path structure:
```
portfolio-images/
└── {user_id}/
    ├── {timestamp}-{random_id}-{filename}.jpg
    ├── {timestamp}-{random_id}-{filename}.png
    └── ...
```

This ensures:
- Users can only access their own images
- File names are unique (no collisions)
- Easy to identify and clean up user images

## Features

The image upload system includes:

- ✅ **Drag & drop** - Simply drag images onto the upload area
- ✅ **Click to browse** - Click to open file picker
- ✅ **URL paste** - Alternative option to use external image URLs
- ✅ **Image preview** - See images before and after upload
- ✅ **Auto-compression** - Images are compressed client-side before upload
- ✅ **Progress indicator** - Visual feedback during upload
- ✅ **File validation** - Type and size validation before upload
- ✅ **Error handling** - Clear error messages for failed uploads
- ✅ **Image removal** - Remove uploaded images with one click

## Supported Formats

- JPEG/JPG
- PNG
- GIF
- WebP

Maximum file size: **5MB** (configurable)

## Troubleshooting

### "Failed to upload image" error
1. Check that the storage bucket exists
2. Verify RLS policies are set up correctly
3. Ensure the user is authenticated
4. Check browser console for detailed error

### Images not loading after upload
1. Verify the bucket is set to public
2. Check the SELECT policy allows public access
3. Clear browser cache

### Upload timeout
- Large images are compressed before upload
- If still timing out, try a smaller image or check network connection

## Security Notes

- Images are stored in user-specific folders
- Users can only modify their own images
- Public read access is required for portfolio viewing
- File size and type restrictions prevent abuse

