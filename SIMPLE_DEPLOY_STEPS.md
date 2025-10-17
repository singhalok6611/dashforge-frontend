# 🚀 Deploy Frontend - Simple Dashboard Method

## ✅ All Files Are Ready!

Your frontend is 100% configured and ready to deploy.

---

## 📋 **FOLLOW THESE EXACT STEPS:**

### Step 1: Go to Railway Dashboard
Open this link: https://railway.app/project/b1f7ec02-1502-4dfa-b9b0-710c8a514817

### Step 2: Create Frontend Service
1. Click the **"+ New"** button (top right)
2. Select **"GitHub Repo"**
3. If you don't have GitHub connected:
   - Select **"Empty Service"** instead
   - Name it: `frontend`

### Step 3A: If Using GitHub Repo:
1. Connect your GitHub account
2. Push this frontend code to GitHub:
   ```bash
   cd /Users/alok.singh1166/dashforge/dashforge/apps/frontend
   git init
   git add .
   git commit -m "Deploy frontend"
   gh repo create dashforge-frontend --public --source=. --push
   ```
3. In Railway, select the `dashforge-frontend` repo
4. Railway will auto-detect and deploy!

### Step 3B: If Using Empty Service:
1. After creating empty service named "frontend"
2. Go to service "Settings" tab
3. Under "Build & Deploy" section:
   - Click "Configure"
   - Select "Dockerfile"
   - Set Root Directory: `/`
4. Then manually upload files OR use GitHub (recommended)

---

## 🔧 **Step 4: Add Environment Variable**

In the frontend service:
1. Go to **"Variables"** tab
2. Click **"+ New Variable"**
3. Add:
   - **Name:** `NEXT_PUBLIC_API_URL`
   - **Value:** `https://backend-production-8bb8.up.railway.app/api`
4. Click **"Add"**

---

## 🌐 **Step 5: Get Your URL**

1. Go to **"Settings"** tab
2. Under "Networking" section
3. Click **"Generate Domain"**
4. Copy your frontend URL!

**Example:** `frontend-production-xxxx.up.railway.app`

---

## ✨ **That's It!**

Your DashForge frontend will be live at the generated URL.

**Backend API:** https://backend-production-8bb8.up.railway.app/api
**Frontend:** (Your generated URL)

---

## 📝 **Quick GitHub Deploy (Recommended)**

If you want automatic deployments, use GitHub:

```bash
cd /Users/alok.singh1166/dashforge/dashforge/apps/frontend

# Install GitHub CLI if needed
brew install gh

# Login to GitHub
gh auth login

# Create and push repo
git init
git add .
git commit -m "Deploy DashForge frontend"
gh repo create dashforge-frontend --public --source=. --push
```

Then in Railway dashboard → "+ New" → "GitHub Repo" → Select "dashforge-frontend"

Done! 🎉
