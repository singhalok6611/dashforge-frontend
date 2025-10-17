# Deploy Frontend to Railway

## ✅ Frontend is Ready for Deployment!

All configuration files have been prepared:
- ✅ Dockerfile optimized for Railway
- ✅ railway.toml configured
- ✅ package-lock.json generated
- ✅ Next.js standalone build configured

## 🚀 Deploy via Railway Dashboard (Easiest Method)

### Step 1: Go to Your Railway Project
Visit: https://railway.app/project/b1f7ec02-1502-4dfa-b9b0-710c8a514817

### Step 2: Create New Service
1. Click "+ New" button
2. Select "Empty Service"
3. Name it **"frontend"**

### Step 3: Deploy from This Directory
1. In the frontend service, go to "Settings" tab
2. Under "Source", select "Deploy from local directory"
3. Run this command in your terminal:
   ```bash
   cd /Users/alok.singh1166/dashforge/dashforge/apps/frontend
   railway up --service <SERVICE_ID_FROM_DASHBOARD>
   ```

### Step 4: Set Environment Variables
In the frontend service "Variables" tab, add:
```
NEXT_PUBLIC_API_URL=https://backend-production-8bb8.up.railway.app/api
```

### Step 5: Generate Domain
1. Go to "Settings" tab
2. Click "Generate Domain"
3. Copy your frontend URL!

---

## 📦 Alternative: Deploy via GitHub (Recommended for Future Updates)

### Step 1: Initialize Git
```bash
cd /Users/alok.singh1166/dashforge/dashforge/apps/frontend
git init
git add .
git commit -m "Initial frontend deployment"
```

### Step 2: Create GitHub Repository
```bash
gh repo create dashforge-frontend --public --source=. --remote=origin --push
```

### Step 3: Connect Railway to GitHub
1. In Railway dashboard, click "+ New"
2. Select "GitHub Repo"
3. Choose "dashforge-frontend"
4. Railway will auto-deploy!

---

## 🔑 Backend API URL

Your frontend should connect to:
```
https://backend-production-8bb8.up.railway.app/api
```

---

## 📝 Files Configured

- `Dockerfile` - Optimized multi-stage build
- `railway.toml` - Railway deployment configuration
- `next.config.js` - Standalone output for production
- `package.json` - Dependencies configured

All set! Just follow the steps above to deploy.
