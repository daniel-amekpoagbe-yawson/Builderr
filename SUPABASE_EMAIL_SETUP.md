# Supabase Email Verification Setup

This guide will help you fix the email verification redirect URL issue.

## Problem

When users sign up, they receive a verification email with a link pointing to `localhost` instead of your Vercel URL. This happens because Supabase uses the "Site URL" configured in your project settings.

## Solution 1: Update Supabase Site URL (Recommended)

### Step 1: Get Your Vercel URL
1. Go to your Vercel project dashboard
2. Copy your production URL (e.g., `https://your-app.vercel.app`)

### Step 2: Update Supabase Settings
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **Settings** → **Authentication** → **URL Configuration**
4. Update the **Site URL** field with your Vercel URL:
   ```
   https://your-app.vercel.app
   ```
5. Add your Vercel URL to **Redirect URLs**:
   ```
   https://your-app.vercel.app/auth/callback
   ```
6. Click **Save**

### Step 3: Add Environment Variable (Optional but Recommended)
Add your production URL to Vercel environment variables:

1. Go to your Vercel project → **Settings** → **Environment Variables**
2. Add:
   - **Name**: `VITE_SITE_URL`
   - **Value**: `https://your-app.vercel.app`
   - **Environment**: Production (and Preview if you want)

This ensures the app uses the correct URL in production.

---

## Solution 2: Disable Email Verification (For Testing Only)

⚠️ **Warning**: Only use this for testing! Disabling email verification is not recommended for production.

### Steps:
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **Settings** → **Authentication** → **Providers** → **Email**
4. Toggle off **"Enable email confirmations"**
5. Click **Save**

Now users can sign up and immediately use the app without email verification.

---

## Solution 3: Use Both Localhost and Production URLs

If you want to test locally AND in production:

1. In Supabase Dashboard → **Settings** → **Authentication** → **URL Configuration**
2. Add both URLs to **Redirect URLs**:
   ```
   http://localhost:3000/auth/callback
   https://your-app.vercel.app/auth/callback
   ```
3. Set **Site URL** to your production URL (Vercel URL)

---

## How It Works Now

The code has been updated to:
1. ✅ Use `VITE_SITE_URL` environment variable if set (production)
2. ✅ Fall back to `window.location.origin` (works for both localhost and production)
3. ✅ Include the correct redirect URL in signup emails
4. ✅ Handle the callback route at `/auth/callback`

---

## Testing

### Test Email Verification:
1. Sign up with a new email
2. Check your email for the verification link
3. Click the link - it should redirect to your Vercel URL (not localhost)
4. You should be automatically logged in and redirected to the dashboard

### Test Locally:
- The app will use `http://localhost:3000` automatically
- Make sure to add `http://localhost:3000/auth/callback` to Supabase redirect URLs

---

## Troubleshooting

### Still seeing localhost in emails?
- Clear your browser cache
- Make sure you saved the changes in Supabase dashboard
- Wait a few minutes for changes to propagate
- Check that `VITE_SITE_URL` is set in Vercel environment variables

### Callback page not working?
- Make sure the route `/auth/callback` exists (it's been added)
- Check that the redirect URL is added to Supabase allowed URLs
- Check browser console for errors

### Users can't verify?
- Check Supabase logs: **Logs** → **Auth Logs**
- Verify the redirect URL matches exactly (including `/auth/callback`)
- Make sure email confirmations are enabled in Supabase

---

## Quick Fix for Immediate Testing

If you need users to test right now and don't want to wait for email verification:

1. **Disable email confirmations** (Solution 2 above)
2. Users can sign up and immediately use the app
3. Re-enable email confirmations when ready for production

---

**Note**: The code changes have been made. You just need to update your Supabase settings and optionally add the `VITE_SITE_URL` environment variable in Vercel.

