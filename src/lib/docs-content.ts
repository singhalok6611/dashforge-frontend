export interface DocArticle {
  id: string;
  slug: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  content: string;
  relatedArticles?: string[];
}

export const docArticles: Record<string, DocArticle> = {
  'introduction-to-dashforge': {
    id: '1',
    slug: 'introduction-to-dashforge',
    title: 'Introduction to DashForge',
    description: 'Learn what DashForge is and how it can help you build internal tools faster',
    duration: '5 min read',
    category: 'Getting Started',
    content: `
# Introduction to DashForge

Welcome to DashForge, the professional no-code platform for building internal dashboards and admin panels!

## What is DashForge?

DashForge is a powerful platform that allows you to create custom dashboards, admin panels, and internal tools without writing code. Whether you're building a sales dashboard, inventory management system, or customer support portal, DashForge provides all the tools you need.

## Key Features

### 1. Visual Builder
Build interfaces by dragging and dropping components. No coding required!

### 2. Database Connections
Connect to PostgreSQL, MySQL, MongoDB, or any REST API with just a few clicks.

### 3. Pre-built Components
Access a library of professional components including:
- Data tables with sorting and filtering
- Interactive charts and graphs
- Forms with validation
- Navigation and layout components

### 4. Custom Queries
Write SQL queries or use our visual query builder to fetch and manipulate data.

### 5. Role-Based Access Control
Control who can view and edit your applications with granular permissions.

## Who is DashForge For?

- **Developers** who want to build internal tools faster
- **Product Managers** who need to create dashboards without coding
- **Operations Teams** who require custom workflow tools
- **Startups** looking to move quickly without hiring large teams

## Getting Started

Ready to build your first app? Check out our [Creating Your First App](/dashboard/docs/creating-your-first-app) guide!
    `,
    relatedArticles: ['creating-your-first-app', 'understanding-the-dashboard']
  },

  'creating-your-first-app': {
    id: '2',
    slug: 'creating-your-first-app',
    title: 'Creating Your First App',
    description: 'Step-by-step guide to building your first application',
    duration: '10 min read',
    category: 'Getting Started',
    content: `
# Creating Your First App

This tutorial will walk you through creating your first application in DashForge.

## Step 1: Navigate to Apps

1. Log in to your DashForge account
2. Click on **"My Apps"** in the sidebar
3. Click the **"New App"** button

## Step 2: Choose a Template

DashForge offers several templates to get you started:

### Blank App
Start with an empty canvas for complete flexibility.

### Analytics Dashboard
Pre-built dashboard with charts and metrics - perfect for business intelligence.

### Admin Panel
CRUD operations with data tables - ideal for managing records.

### Form Builder
Create forms with validation - great for data collection.

## Step 3: Configure Your App

Enter your app details:
- **Name**: Give your app a descriptive name
- **Description**: Explain what your app does
- **Template**: Select your starting template

## Step 4: Connect Data Sources

After creating your app, connect your data:

1. Go to **Data Sources** in the sidebar
2. Click **"Connect Database"**
3. Enter your database credentials
4. Test the connection

## Step 5: Build Your Interface

Use the visual builder to:
- Add components from the sidebar
- Configure component properties
- Bind data to components
- Style your interface

## Step 6: Test and Deploy

1. Use the preview mode to test your app
2. Invite team members if needed
3. Set permissions
4. Your app is ready to use!

## Next Steps

- Learn about [Data Sources](/dashboard/docs/connecting-postgresql)
- Explore [Components](/dashboard/docs/available-components)
- Master [Queries](/dashboard/docs/writing-sql-queries)
    `,
    relatedArticles: ['connecting-postgresql', 'available-components']
  },

  'connecting-postgresql': {
    id: '5',
    slug: 'connecting-postgresql',
    title: 'Connecting PostgreSQL',
    description: 'Learn how to connect your PostgreSQL database to DashForge',
    duration: '8 min read',
    category: 'Data Sources',
    content: `
# Connecting PostgreSQL

PostgreSQL is one of the most popular open-source relational databases. This guide shows you how to connect it to DashForge.

## Prerequisites

Before connecting, ensure you have:
- PostgreSQL database running
- Database credentials (host, port, username, password)
- Network access to your database

## Connection Steps

### 1. Navigate to Data Sources

Go to **Dashboard → Data Sources** and click **"Connect Database"**.

### 2. Select PostgreSQL

Choose PostgreSQL from the database type options.

### 3. Enter Connection Details

Fill in the connection form:

\`\`\`
Host: your-db-host.com
Port: 5432
Database Name: myapp_production
Username: postgres
Password: ••••••••
\`\`\`

### 4. SSL Configuration (Optional)

For production databases, enable SSL/TLS:
- Check the **"Use SSL"** option
- Upload SSL certificates if required

### 5. Test Connection

Click **"Test Connection"** to verify:
- ✅ Connection successful
- ❌ Connection failed (check credentials)

### 6. Save Configuration

Once the test passes, click **"Save Data Source"**.

## Security Best Practices

### Use Read-Only Users
Create a dedicated database user with limited permissions:

\`\`\`sql
CREATE USER dashforge_readonly WITH PASSWORD 'secure_password';
GRANT CONNECT ON DATABASE myapp TO dashforge_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO dashforge_readonly;
\`\`\`

### Enable SSL
Always use SSL for production databases:
- Encrypts data in transit
- Prevents man-in-the-middle attacks

### Whitelist IPs
Configure your firewall to only allow connections from DashForge IPs.

## Troubleshooting

### Connection Timeout
- Check if your database accepts remote connections
- Verify firewall rules
- Confirm network connectivity

### Authentication Failed
- Double-check username and password
- Ensure user has necessary permissions
- Verify database name is correct

### SSL Errors
- Confirm SSL is enabled on the database
- Check certificate validity
- Verify SSL mode configuration

## Next Steps

- Learn how to [Write SQL Queries](/dashboard/docs/writing-sql-queries)
- Build [Tables and Data Display](/dashboard/docs/tables-data-display)
- Explore [Query Variables](/dashboard/docs/query-variables)
    `,
    relatedArticles: ['writing-sql-queries', 'working-with-mysql']
  },

  'available-components': {
    id: '9',
    slug: 'available-components',
    title: 'Available Components',
    description: 'Complete reference of all components available in DashForge',
    duration: '6 min read',
    category: 'Components & UI',
    content: `
# Available Components

DashForge provides a comprehensive library of pre-built components for building professional interfaces.

## Data Display Components

### Table
Display and manipulate tabular data with sorting, filtering, and pagination.

**Features:**
- Sortable columns
- Search and filter
- Pagination
- Row selection
- Export to CSV/Excel

### Chart
Visualize data with interactive charts and graphs.

**Chart Types:**
- Line charts
- Bar charts
- Pie charts
- Area charts
- Scatter plots

### Stat Card
Show key metrics and KPIs with optional trend indicators.

**Props:**
- Title
- Value
- Change percentage
- Icon
- Color theme

## Form Components

### Input
Text input field with validation support.

**Types:**
- Text
- Email
- Password
- Number
- URL

### Select
Dropdown selection with search capability.

**Features:**
- Single/Multi-select
- Searchable options
- Custom rendering
- Async data loading

### Checkbox & Radio
Boolean and option selection controls.

### Date Picker
Calendar-based date and time selection.

### File Upload
Upload files with drag-and-drop support.

## Layout Components

### Container
Organize content in responsive layouts.

### Grid
Create flexible grid layouts.

**Grid Options:**
- 2, 3, 4, 6, or 12 columns
- Responsive breakpoints
- Gap control

### Card
Group related content in styled containers.

### Tabs
Organize content in tabbed interfaces.

## Navigation Components

### Sidebar
Vertical navigation menu.

### Header
Top navigation bar with branding.

### Breadcrumbs
Show current location in hierarchy.

## Action Components

### Button
Trigger actions with customizable buttons.

**Variants:**
- Primary
- Secondary
- Outline
- Ghost
- Danger

### Modal
Display content in overlay dialogs.

### Drawer
Side panel for forms or additional content.

## Advanced Components

### Data Grid
Advanced table with inline editing.

### Tree View
Hierarchical data visualization.

### Timeline
Display events chronologically.

### Kanban Board
Drag-and-drop task management.

## Using Components

### Add a Component
1. Open the component library
2. Drag component to canvas
3. Configure properties
4. Bind data

### Configure Properties
Each component has customizable properties:
- Appearance (colors, sizes, styles)
- Data binding
- Event handlers
- Validation rules

### Bind Data
Connect components to your data sources:
1. Select the component
2. Click "Data" tab
3. Choose data source
4. Map fields

## Next Steps

- Learn about [Tables and Data Display](/dashboard/docs/tables-data-display)
- Explore [Charts and Visualizations](/dashboard/docs/charts-visualizations)
- Master [Forms and Input Fields](/dashboard/docs/forms-input-fields)
    `,
    relatedArticles: ['tables-data-display', 'forms-input-fields', 'charts-visualizations']
  },

  'writing-sql-queries': {
    id: '13',
    slug: 'writing-sql-queries',
    title: 'Writing SQL Queries',
    description: 'Master SQL queries in DashForge for powerful data manipulation',
    duration: '12 min read',
    category: 'Queries & Logic',
    content: `
# Writing SQL Queries

Learn how to write and execute SQL queries in DashForge to fetch and manipulate data.

## Creating a Query

### 1. Navigate to Queries
Go to your app → **Queries** tab → **New Query**

### 2. Select Data Source
Choose the database connection you want to query.

### 3. Write Your SQL
Use the SQL editor with syntax highlighting:

\`\`\`sql
SELECT
  id,
  name,
  email,
  created_at
FROM users
WHERE status = 'active'
ORDER BY created_at DESC
LIMIT 10;
\`\`\`

### 4. Test Your Query
Click **"Run Query"** to test execution and view results.

### 5. Save the Query
Give your query a name and save it for use in components.

## Query Variables

### Using Parameters
Make queries dynamic with variables:

\`\`\`sql
SELECT * FROM products
WHERE category = {{ category }}
AND price <= {{ maxPrice }}
\`\`\`

### Variable Types
- **String**: Text values
- **Number**: Numeric values
- **Boolean**: True/false
- **Array**: Lists of values
- **Date**: Date/time values

### Binding Variables
Connect variables to:
- Input fields
- Select dropdowns
- URL parameters
- Component state

## Advanced Techniques

### Joins
Combine data from multiple tables:

\`\`\`sql
SELECT
  o.id,
  o.order_date,
  c.name as customer_name,
  p.name as product_name
FROM orders o
JOIN customers c ON o.customer_id = c.id
JOIN products p ON o.product_id = p.id
WHERE o.status = 'completed';
\`\`\`

### Aggregations
Calculate summaries:

\`\`\`sql
SELECT
  DATE(created_at) as date,
  COUNT(*) as order_count,
  SUM(total) as revenue
FROM orders
GROUP BY DATE(created_at)
ORDER BY date DESC;
\`\`\`

### Subqueries
Use nested queries:

\`\`\`sql
SELECT *
FROM products
WHERE price > (
  SELECT AVG(price)
  FROM products
);
\`\`\`

## Best Practices

### 1. Use Parameterized Queries
Prevent SQL injection:

❌ **Bad:**
\`\`\`sql
SELECT * FROM users WHERE id = \" + userId
\`\`\`

✅ **Good:**
\`\`\`sql
SELECT * FROM users WHERE id = {{ userId }}
\`\`\`

### 2. Limit Result Sets
Always use LIMIT for large datasets:

\`\`\`sql
SELECT * FROM orders LIMIT 1000;
\`\`\`

### 3. Index Your Queries
Ensure frequently queried columns are indexed.

### 4. Use Prepared Statements
DashForge automatically uses prepared statements for security.

## Debugging Queries

### View Execution Plan
Click **"Explain"** to see query performance.

### Check Query Logs
View executed queries in the logs tab.

### Monitor Performance
Track query execution time and optimize slow queries.

## Next Steps

- Learn about [JavaScript Transforms](/dashboard/docs/javascript-transforms)
- Explore [Query Variables](/dashboard/docs/query-variables)
- Master [Error Handling](/dashboard/docs/error-handling)
    `,
    relatedArticles: ['javascript-transforms', 'query-variables', 'error-handling']
  },

  'user-authentication': {
    id: '17',
    slug: 'user-authentication',
    title: 'User Authentication',
    description: 'Implement secure user authentication in your applications',
    duration: '10 min read',
    category: 'Security & Access',
    content: `
# User Authentication

Learn how to implement secure authentication and protect your DashForge applications.

## Authentication Methods

### 1. Built-in Auth
Use DashForge's built-in authentication:

- Email/Password
- OAuth providers (Google, GitHub, etc.)
- SSO (Enterprise plans)

### 2. Custom Auth
Integrate your existing authentication system:

- JWT tokens
- Session-based auth
- API keys

## Setting Up Authentication

### Enable Auth for Your App
1. Go to **App Settings**
2. Click **"Security"** tab
3. Enable **"Require Authentication"**

### Configure Auth Providers
Add authentication providers:

**Email/Password:**
- Users register with email
- Password validation rules
- Email verification

**OAuth:**
- Google OAuth
- GitHub OAuth
- Custom OAuth providers

### Set Login Page
Customize the login experience:
- Logo and branding
- Custom fields
- Terms and conditions

## User Roles and Permissions

### Default Roles
- **Owner**: Full control
- **Admin**: Manage users and settings
- **Member**: View and edit content
- **Viewer**: Read-only access

### Custom Roles
Create custom roles with specific permissions:

1. Go to **Team Settings**
2. Click **"Roles"**
3. Create new role
4. Assign permissions

## Protecting Pages

### Page-Level Security
Restrict access to specific pages:

\`\`\`javascript
// Check user role
if (currentUser.role !== 'admin') {
  redirect('/unauthorized');
}
\`\`\`

### Component-Level Security
Show/hide components based on permissions:

\`\`\`javascript
// Show admin button only to admins
showButton = currentUser.role === 'admin';
\`\`\`

## Session Management

### Session Duration
Configure how long users stay logged in:
- Default: 7 days
- Adjustable: 1 hour to 30 days
- Remember me option

### Logout
Users can manually logout:
- Clear session
- Revoke tokens
- Redirect to login

## Security Best Practices

### 1. Strong Passwords
Enforce password requirements:
- Minimum 8 characters
- Mix of uppercase, lowercase, numbers
- Special characters

### 2. Two-Factor Authentication
Enable 2FA for sensitive apps:
- SMS codes
- Authenticator apps
- Email verification

### 3. Rate Limiting
Prevent brute force attacks:
- Limit login attempts
- Temporary account locks
- CAPTCHA after failures

### 4. Audit Logs
Track authentication events:
- Login attempts
- Password changes
- Permission modifications

## SSO Integration (Enterprise)

### SAML
Integrate with enterprise identity providers:
- Active Directory
- Okta
- Azure AD

### Setup Steps
1. Contact support for SSO setup
2. Provide IdP metadata
3. Configure attribute mapping
4. Test SSO flow

## Troubleshooting

### Users Can't Log In
- Check credentials
- Verify email is verified
- Check account status
- Review auth logs

### OAuth Not Working
- Verify OAuth credentials
- Check redirect URLs
- Confirm scopes

### Session Expires Too Soon
- Adjust session duration
- Check server time
- Verify token expiration

## Next Steps

- Learn about [Role-Based Access Control](/dashboard/docs/role-based-access-control)
- Explore [API Security](/dashboard/docs/api-security)
- Master [Best Security Practices](/dashboard/docs/security-best-practices)
    `,
    relatedArticles: ['role-based-access-control', 'api-security', 'security-best-practices']
  }
};

// Get all articles for a category
export function getArticlesByCategory(category: string): DocArticle[] {
  return Object.values(docArticles).filter(article => article.category === category);
}

// Get article by slug
export function getArticleBySlug(slug: string): DocArticle | undefined {
  return docArticles[slug];
}

// Search articles
export function searchArticles(query: string): DocArticle[] {
  const lowerQuery = query.toLowerCase();
  return Object.values(docArticles).filter(article =>
    article.title.toLowerCase().includes(lowerQuery) ||
    article.description.toLowerCase().includes(lowerQuery) ||
    article.content.toLowerCase().includes(lowerQuery)
  );
}
