const { execSync } = require('child_process');

// Get Railway token from CLI
const token = execSync('railway whoami --json 2>/dev/null || echo "{}"').toString();
let apiToken = '';

try {
  apiToken = JSON.parse(token).token;
} catch (e) {
  console.log('❌ Could not get Railway token');
  process.exit(1);
}

// Create service via GraphQL API
const mutation = `
mutation {
  serviceCreate(input: {
    name: "frontend"
    projectId: "b1f7ec02-1502-4dfa-b9b0-710c8a514817"
  }) {
    id
    name
  }
}
`;

const response = execSync(`curl -s -X POST https://backboard.railway.app/graphql/v2 \
  -H "Authorization: Bearer ${apiToken}" \
  -H "Content-Type: application/json" \
  -d '${JSON.stringify({ query: mutation })}'`).toString();

console.log('Response:', response);

const result = JSON.parse(response);
if (result.data && result.data.serviceCreate) {
  const serviceId = result.data.serviceCreate.id;
  console.log('\n✅ Frontend service created!');
  console.log(`Service ID: ${serviceId}`);
  console.log(`\n🚀 Now deploying...`);
  
  execSync(`railway up --service ${serviceId}`, { stdio: 'inherit' });
} else {
  console.log('❌ Failed to create service');
  console.log('Response:', JSON.stringify(result, null, 2));
}
