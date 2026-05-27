# WorkiFy — Supabase + GitHub Pages Setup Guide

## Step 1: Create a Supabase Project

1. Go to https://supabase.com and sign up (free)
2. Click **New Project**, give it a name (e.g. "workify")
3. Set a strong database password and click **Create project**

---

## Step 2: Run the SQL to create your tables

In Supabase → **SQL Editor** → **New query**, paste and run this:

```sql
-- Bookings table
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT,
  main_category TEXT,
  sub_service TEXT,
  hours INTEGER,
  workers INTEGER,
  date DATE,
  phone TEXT,
  offer_code TEXT,
  details TEXT,
  total_price INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users profile table (links to Supabase Auth)
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE,
  username TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact messages
CREATE TABLE user_messages (
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Step 3: Set Row Level Security (RLS) policies

Run this in SQL Editor to allow public inserts but protect reads:

```sql
-- Allow anyone to insert bookings
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow insert" ON bookings FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow admin read" ON bookings FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin delete" ON bookings FOR DELETE USING (auth.role() = 'authenticated');

-- Allow anyone to insert messages
ALTER TABLE user_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow insert" ON user_messages FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow admin read" ON user_messages FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin delete" ON user_messages FOR DELETE USING (auth.role() = 'authenticated');

-- Users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow insert on signup" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin read" ON users FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin delete" ON users FOR DELETE USING (auth.role() = 'authenticated');
```

---

## Step 4: Get your API keys

Supabase → **Project Settings** → **API**

Copy:
- **Project URL** (looks like `https://xxxx.supabase.co`)
- **anon public** key

Open `js/supabase.js` and replace:
```js
const SUPABASE_URL  = 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_ANON = 'YOUR_ANON_PUBLIC_KEY';
```

---

## Step 5: Set your admin email

Open `admin.html` and find this line near the top of the `<script>`:
```js
const ADMIN_EMAIL = 'admin@workify.com';
```
Change it to your actual email address.

Then go to Supabase → **Authentication** → **Users** → **Invite user** to create your admin account.

---

## Step 6: Upload images

Create an `images/` folder in the project and put all your images there:
- logoBlack.png
- homeWorker.jpg, bookwithpen.jpg
- painterGrp.JPG, painter2.JPG, furniture3.JPG, furniture4.JPG
- electrinic.jpg, painter02.jpg
- outDoor3.JPG, lifting4.JPG, lifting.JPG, grpWorker.JPG
- cleanerGirl2rem.png

---

## Step 7: Deploy to GitHub Pages

1. Create a new GitHub repository (e.g. `workify`)
2. Upload ALL project files (keep the folder structure)
3. Go to **Settings** → **Pages**
4. Set **Source** to `main` branch, root folder `/`
5. Click **Save** — your site will be live at:
   `https://YOUR_USERNAME.github.io/workify/`

---

## File Structure

```
workify/
├── index.html          ← Homepage
├── booking.html        ← Booking form
├── login.html          ← Login
├── signup.html         ← Sign up
├── offer.html          ← Exclusive offer (login required)
├── search.html         ← Search results
├── about.html          ← About Us
├── help.html           ← Help / FAQ
├── legal.html          ← Legal / Terms
├── admin.html          ← Admin panel
├── css/
│   └── style.css
├── js/
│   └── supabase.js     ← ⚠️ ADD YOUR KEYS HERE
└── images/             ← ⚠️ ADD YOUR IMAGES HERE
```

---

## What replaced what (PHP → JS)

| Old PHP file        | New file         | How                        |
|---------------------|------------------|----------------------------|
| homepage.php        | index.html       | Pure HTML + JS             |
| form.php / form2.php| booking.html     | Supabase JS insert         |
| logincheck.php      | login.html       | supabase.auth.signIn       |
| signupcheck.php     | signup.html      | supabase.auth.signUp       |
| offer.php           | offer.html       | supabase.auth.getUser      |
| search.php          | search.html      | Client-side JS filter      |
| submit_contact.php  | index.html modal | Supabase JS insert         |
| connect.php         | js/supabase.js   | Supabase client config     |
| Admin panel (PHP)   | admin.html       | Supabase JS queries        |
