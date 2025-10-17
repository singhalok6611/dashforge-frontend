#!/bin/bash

echo "🚀 DashForge Frontend Deployment Script"
echo "========================================"
echo ""

# Navigate to frontend directory
cd /Users/alok.singh1166/dashforge/dashforge/apps/frontend

echo "📍 Current directory: $(pwd)"
echo ""

# Check Railway login
echo "✓ Checking Railway login..."
railway whoami
echo ""

# Link to project
echo "🔗 Linking to Railway project..."
railway link -p b1f7ec02-1502-4dfa-b9b0-710c8a514817 -e 99a858e9-150c-40e0-ba85-fcfa4053b049
echo ""

# Deploy to Railway - backend service temporarily
echo "📦 Deploying frontend code..."
echo ""
echo "⚠️  When prompted:"
echo "   1. If asked to select service: Choose 'backend' (we'll create frontend service after)"
echo "   2. Or skip if it uploads directly"
echo ""

railway up --service 6fb90e87-4214-41d8-8127-f7a6f5bca541 --detach

echo ""
echo "✅ Deployment initiated!"
echo ""
echo "Next steps:"
echo "1. Go to: https://railway.app/project/b1f7ec02-1502-4dfa-b9b0-710c8a514817"
echo "2. Click '+ New' → 'Empty Service' → Name it 'frontend'"
echo "3. In the new service, go to Settings → Deploy"
echo "4. The code is already uploaded, just trigger a deploy"
echo ""
