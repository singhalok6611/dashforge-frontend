#!/bin/bash

echo "🚀 DashForge Frontend - GitHub Deployment"
echo "=========================================="
echo ""
echo "📋 Run these commands in your terminal:"
echo ""

cat << 'COMMANDS'

# Step 1: Login to GitHub (will open browser)
gh auth login

# Step 2: Create GitHub repository and push code
cd /Users/alok.singh1166/dashforge/dashforge/apps/frontend
gh repo create dashforge-frontend --public --source=. --push

# Step 3: Now deploy to Railway from GitHub
# Go to: https://railway.app/project/b1f7ec02-1502-4dfa-b9b0-710c8a514817
# Click: "+ New" → "GitHub Repo" → Select "dashforge-frontend"
# Railway will auto-deploy!

# Step 4: Add environment variable in Railway dashboard
# Go to the frontend service → Variables tab
# Add: NEXT_PUBLIC_API_URL = https://backend-production-8bb8.up.railway.app/api

# Step 5: Generate domain
# Go to Settings → Generate Domain
# Your frontend will be live!

COMMANDS

echo ""
echo "✅ Your backend is already live at:"
echo "   https://backend-production-8bb8.up.railway.app"
echo ""
echo "💡 After deploying frontend, you'll have:"
echo "   - Backend API: https://backend-production-8bb8.up.railway.app/api"
echo "   - Frontend UI: https://frontend-production-xxxx.up.railway.app"
echo ""
