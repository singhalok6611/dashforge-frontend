#!/bin/bash

# Get Railway token
TOKEN=$(railway whoami --json 2>/dev/null | grep -o '"token":"[^"]*"' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo "❌ Not logged into Railway"
  exit 1
fi

# Project and environment IDs
PROJECT_ID="b1f7ec02-1502-4dfa-b9b0-710c8a514817"
ENV_ID="99a858e9-150c-40e0-ba85-fcfa4053b049"

# Create new service
echo "📦 Creating frontend service..."

SERVICE_RESPONSE=$(curl -s -X POST https://backboard.railway.app/graphql/v2 \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation { serviceCreate(input: { name: \"frontend\", projectId: \"'$PROJECT_ID'\" }) { id name } }"
  }')

echo "Response: $SERVICE_RESPONSE"

SERVICE_ID=$(echo $SERVICE_RESPONSE | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ -z "$SERVICE_ID" ]; then
  echo "❌ Failed to create service"
  exit 1
fi

echo "✅ Service created with ID: $SERVICE_ID"
echo ""
echo "🚀 Now deploy using:"
echo "   cd /Users/alok.singh1166/dashforge/dashforge/apps/frontend"
echo "   railway up --service $SERVICE_ID"
