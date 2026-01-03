# Disable Email Verification - Quick Setup

This guide will help you disable email verification so users can sign up and immediately use the app without needing to verify their email.

## ⚠️ Important Note

**This is recommended for testing only.** For production, you should enable email verification for security.

## Steps to Disable Email Verification

### 1. Go to Supabase Dashboard
1. Visit [https://app.supabase.com](https://app.supabase.com)
2. Sign in to your account
3. Select your Buildrr project

### 2. Navigate to Authentication Settings
1. Click on **Settings** in the left sidebar
2. Click on **Authentication** in the settings menu
3. Scroll down to find **Email Auth** section

### 3. Disable Email Confirmations
1. Find the toggle for **"Enable email confirmations"**
2. **Turn it OFF** (toggle should be gray/unchecked)
3. Click **Save** at the bottom of the page

### 4. Verify the Change
- The toggle should now be OFF
- Users can now sign up without email verification

## What This Means

✅ **Users can:**
- Sign up with email and password
- Immediately access the app after signup
- Use all features without waiting for email verification

❌ **Users won't:**
- Receive verification emails
- Need to click any email links
- Wait for account activation

## Testing

1. Try signing up with a new account
2. You should be immediately redirected to the dashboard
3. No email verification required!

## Re-enabling Email Verification (For Later)

When you're ready for production:

1. Go back to **Settings** → **Authentication** → **Email Auth**
2. Turn **"Enable email confirmations"** back ON
3. Make sure you've set up the redirect URLs (see `SUPABASE_EMAIL_SETUP.md`)
4. Click **Save**

---

**That's it!** Users can now sign up and start using Buildrr immediately. 🚀

