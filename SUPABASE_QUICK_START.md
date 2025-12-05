# ⚡ Supabase Quick Setup (5 Minutes)

## 🚀 Fast Setup Steps

### 1. Create Supabase Account & Project
- Go to [supabase.com](https://supabase.com) → Sign up
- Click **"New Project"**
- Name: `EmpowerYou`
- Set a database password (save it!)
- Choose region → Click **"Create"**

### 2. Get API Credentials
- In project dashboard → **Settings** → **API**
- Copy **Project URL** and **anon/public key**

### 3. Create Database Table
- Click **SQL Editor** → **New query**
- Paste and run:

```sql
CREATE TABLE IF NOT EXISTS submissions (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  course TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations for serverless functions"
ON submissions FOR ALL USING (true) WITH CHECK (true);
```

### 4. Add to Netlify
- Netlify Dashboard → Your Site → **Environment Variables**
- Add: `SUPABASE_URL` = (your project URL)
- Add: `SUPABASE_ANON_KEY` = (your anon key)
- **Redeploy** your site

### 5. Done! ✅
- Test form submission
- Check Supabase **Table Editor** → **submissions**
- Your data is now permanent! 🎉

---

**Full guide:** See `SUPABASE_SETUP.md` for detailed instructions.

