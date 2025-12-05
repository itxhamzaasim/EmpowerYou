# 🗄️ Supabase Setup Guide - Permanent Cloud Database

This guide will help you set up Supabase (PostgreSQL cloud database) for permanent data storage on Netlify.

## ✅ Why Supabase?

- ✅ **Free tier** with generous limits
- ✅ **Permanent storage** - data never gets lost
- ✅ **Easy setup** - 10 minutes
- ✅ **PostgreSQL** - powerful and reliable
- ✅ **Works perfectly** with Netlify

## 📋 Step 1: Create Supabase Account

1. Go to [supabase.com](https://supabase.com)
2. Click **"Start your project"** or **"Sign up"**
3. Sign up with GitHub (recommended) or email
4. Verify your email if needed

## 📋 Step 2: Create a New Project

1. Click **"New Project"** in your Supabase dashboard
2. Fill in the details:
   - **Name:** `EmpowerYou` (or any name you like)
   - **Database Password:** Create a strong password (save it!)
   - **Region:** Choose closest to your users
   - **Pricing Plan:** Free (perfect for starting)
3. Click **"Create new project"**
4. Wait 2-3 minutes for project to be created

## 📋 Step 3: Get Your API Credentials

1. In your Supabase project dashboard, click **"Settings"** (gear icon)
2. Click **"API"** in the left sidebar
3. You'll see two important values:

   **Project URL:**
   ```
   https://xxxxxxxxxxxxx.supabase.co
   ```

   **anon/public key:**
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4eHh4eHh4eHh4eHh4eHh4eCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjQwMDAwMDAwLCJleHAiOjE5NTU1NTU1NTl9.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

4. **Copy both values** - you'll need them in the next step

## 📋 Step 4: Create the Database Table

1. In Supabase dashboard, click **"SQL Editor"** in the left sidebar
2. Click **"New query"**
3. Paste this SQL code:

```sql
-- Create submissions table
CREATE TABLE IF NOT EXISTS submissions (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  course TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations (for serverless functions)
-- In production, you might want to restrict this
CREATE POLICY "Allow all operations for serverless functions"
ON submissions
FOR ALL
USING (true)
WITH CHECK (true);
```

4. Click **"Run"** (or press Ctrl+Enter)
5. You should see: **"Success. No rows returned"**

## 📋 Step 5: Set Environment Variables in Netlify

1. Go to your Netlify dashboard
2. Select your **EmpowerYou** site
3. Go to **"Site settings"** → **"Environment variables"**
4. Click **"Add variable"** and add these two:

   **Variable 1:**
   - **Key:** `SUPABASE_URL`
   - **Value:** Your Project URL (from Step 3)
   - **Scopes:** All scopes

   **Variable 2:**
   - **Key:** `SUPABASE_ANON_KEY`
   - **Value:** Your anon/public key (from Step 3)
   - **Scopes:** All scopes

5. Click **"Save"** for each variable

## 📋 Step 6: Redeploy Your Site

1. In Netlify dashboard, go to **"Deploys"**
2. Click **"Trigger deploy"** → **"Clear cache and deploy site"**
3. Wait for deployment to complete

## ✅ Verification

1. Visit your website: `https://your-site.netlify.app`
2. Submit a test form on the contact page
3. Check your Supabase dashboard:
   - Go to **"Table Editor"** in left sidebar
   - Click on **"submissions"** table
   - You should see your test submission! 🎉

## 🔍 Viewing Your Data

### In Supabase Dashboard:
1. Go to **"Table Editor"** → **"submissions"**
2. See all submissions in real-time
3. Edit or delete records directly

### In Your Admin Panel:
1. Visit: `https://your-site.netlify.app/admin.html`
2. Enter your admin password
3. View all submissions

## 📊 Database Structure

Your `submissions` table has these columns:

| Column | Type | Description |
|--------|------|-------------|
| `id` | BIGSERIAL | Auto-incrementing ID (primary key) |
| `name` | TEXT | User's name |
| `email` | TEXT | User's email |
| `course` | TEXT | Selected course |
| `message` | TEXT | Optional message |
| `created_at` | TIMESTAMP | When submission was created |

## 🔒 Security Notes

1. **Row Level Security (RLS):** Enabled but set to allow all operations
   - This is fine for serverless functions with admin password protection
   - For stricter security, you can modify the policy later

2. **API Keys:**
   - The `anon` key is safe to use in serverless functions
   - Never expose your `service_role` key in client-side code

3. **Admin Password:**
   - Still use `ADMIN_PASS` environment variable for admin panel access
   - This adds an extra layer of security

## 🐛 Troubleshooting

### "Failed to create Supabase client"
- Check that `SUPABASE_URL` and `SUPABASE_ANON_KEY` are set correctly
- Make sure there are no extra spaces in the values
- Redeploy after adding environment variables

### "relation 'submissions' does not exist"
- Make sure you ran the SQL query in Step 4
- Check that the table was created in the correct project

### "permission denied for table submissions"
- Check that Row Level Security policy was created correctly
- Verify the `anon` key is correct

### Data not appearing
- Check Netlify function logs for errors
- Verify environment variables are set
- Make sure you redeployed after adding variables

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Supabase Free Tier Limits](https://supabase.com/pricing)

## ✅ You're Done!

Your EmpowerYou website now has **permanent cloud database storage**! 

All form submissions will be saved permanently in Supabase and will never be lost, even when:
- Functions timeout
- Site redeploys
- Server restarts

🎉 **Your data is now safe and permanent!**

