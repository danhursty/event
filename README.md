# 🧙‍♂️ RiseLoop - Modern SaaS Boilerplate.

A powerful, type-safe SaaS boilerplate built with Next.js 15, React, TypeScript, and Supabase. This monorepo is structured using Turborepo and PNPM for optimal development experience and performance.

## Inspiration:

- https://usebasejump.com/blog/testing-on-supabase-with-pgtap#testing-authenticated
- https://github.com/dougwithseismic/turbo-2025/ (Doug is really great and knows his stuff).

## 🏗️ Project Structure

```bash
.
├── apps/
│   ├── web/                 # Next.js 15 frontend application
│   │   ├── app/            # App router pages and layouts
│   │   ├── components/     # Shared UI components
│   │   ├── features/       # Feature-specific code
│   │   ├── integration/    # Integration tests
│   │   ├── e2e/           # End-to-end tests
│   │   └── __tests__/     # Unit tests
│   └── api/                # Backend API (if applicable)
├── packages/
│   ├── supabase/          # Supabase configuration and migrations
│   ├── typescript-config/  # Shared TypeScript configurations
│   └── eslint-config/     # Shared ESLint configurations
└── _project_progress/     # Daily progress tracking
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and PNPM
- Docker and Docker Compose
- Supabase CLI

### Initial Setup

1. Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd riseloop
pnpm install
```

2. Set up environment variables:

```bash
cp apps/web/.env.example apps/web/.env.local
```

3. Start the Supabase local stack:

```bash
cd packages/supabase
supabase start
```

4. Start the development server:

```bash
pnpm dev
```

## 🧪 Testing Strategy

We follow a comprehensive testing approach with a 60/40 split between integration and unit tests.

## Testing RLS Policies

We use a factory-based approach for testing RLS policies and authenticated endpoints. Each test user gets a JWT token that can be used to create authenticated clients:

```typescript
import { describe, it, expect } from "vitest";
import { createTestUser, createTestOrganization } from "../factories";
import { createAuthenticatedClient } from "../test-utils";

describe("Organization RLS Policies", () => {
  it("should enforce member-only access", async () => {
    // 1. Create test users with tokens
    const [adminUser, memberUser, nonMemberUser] = await Promise.all([
      createTestUser({}),
      createTestUser({}),
      createTestUser({}),
    ]);

    // 2. Create an organization with admin
    const { organization } = await createTestOrganization({
      userId: adminUser.user.id,
    });

    // 3. Test access with different user roles
    const adminClient = createAuthenticatedClient(adminUser.token);
    const memberClient = createAuthenticatedClient(memberUser.token);
    const nonMemberClient = createAuthenticatedClient(nonMemberUser.token);

    // Admin should see all members
    const { data: adminData } = await adminClient
      .from("organization_members")
      .select("*")
      .eq("organization_id", organization.id);
    expect(adminData).toHaveLength(1);

    // Non-member should see nothing
    const { data: nonMemberData } = await nonMemberClient
      .from("organization_members")
      .select("*")
      .eq("organization_id", organization.id);
    expect(nonMemberData).toHaveLength(0);
  });
});
```

### Key Testing Patterns

1. **User Factory Functions**:

   ```typescript
   // Create a test user with token
   const { user, token } = await createTestUser({
     email: "test@example.com", // Optional
   });
   ```

2. **Authenticated Clients**:

   ```typescript
   // Create client for RLS testing
   const client = createAuthenticatedClient(token);
   ```

3. **Testing Different Roles**:

   ```typescript
   // Test the same operation with different user roles
   const adminClient = createAuthenticatedClient(adminToken);
   const memberClient = createAuthenticatedClient(memberToken);
   const nonMemberClient = createAuthenticatedClient(nonMemberToken);
   ```

4. **Testing Server Components**:

   ```typescript
   import * as supabaseServer from "@/utils/supabase/server";
   import { vi } from "vitest";

   vi.mock("@/utils/supabase/server", () => ({
     createClient: vi.fn(),
   }));

   it("should handle server operations", async () => {
     const { token } = await createTestUser({});
     const client = createAuthenticatedClient(token);

     // Mock the server client to use our authenticated client
     vi.mocked(supabaseServer.createClient).mockResolvedValue(client);
   });
   ```

### Best Practices

1. **Test Data Setup**:

   - Create test users with `createTestUser()`
   - Each user gets a unique JWT token
   - Use tokens with `createAuthenticatedClient()`

2. **RLS Testing**:

   - Test each operation with different user roles
   - Verify both successful and denied operations
   - Check error messages for proper authorization failures

3. **Token Management**:

   - Tokens are automatically generated with test users
   - Tokens are valid for the test duration
   - Never reuse tokens between tests

4. **Client Usage**:
   - Use `createAdminClient()` only for test setup
   - Use `createAuthenticatedClient()` for actual tests
   - Test both positive and negative cases

## 🔒 Supabase Integration

We use three Supabase clients for different contexts:

- `supabaseAdminClient` - Full access for administrative tasks
- `supabaseClient` - Browser-side client
- `supabaseServerClient` - Server-side operations

Located in `apps/web/utils/supabase/`.

## 🛠️ Development Workflow

1. **Type Safety First**

   ```bash
   # Check types across the monorepo
   pnpm type-check
   ```

2. **Database Migrations**

   ```bash
   # Generate new migration
   cd packages/supabase
   supabase migration new my_migration_name

   # Apply migrations
   supabase db reset
   ```

3. **Testing Changes**

   ```bash
   # Run all tests
   pnpm test:all

   # Run specific test suites
   pnpm test:unit
   pnpm test:integration
   pnpm test:e2e
   ```

## 🔒 Security Best Practices

1. **Environment Variables**:

   - Never commit `.env` files
   - Use `.env.example` as templates
   - Keep different env files for different environments:
     - `.env.local` - Local development
     - `.env.test` - Testing environment
     - `.env.production` - Production environment

2. **Supabase Security**:

   - Local development uses default development keys
   - Never share or commit service role keys
   - Use RLS policies for data access
   - Keep JWT secrets secure

3. **Testing**:
   - Use separate test database
   - Never use production credentials in tests
   - Reset test data between runs
   - Use ephemeral test tokens

## 📚 Documentation

- **Progress Tracking**: Daily progress is documented in `_project_progress/`
- **Learning Resources**: Patterns and best practices in `_learnings/`
- **API Documentation**: Available in `docs/`

## 🔍 Key Features

- Next.js 15 App Router
- Type-safe database operations
- Comprehensive testing setup
- Local development with Supabase
- Monorepo structure with Turborepo
- Modern UI with Tailwind CSS
- SEO optimization
- Analytics integration
- Error tracking with Sentry

## 🤝 Contributing

1. Follow the TypeScript guidelines in `.cursorrules`
2. Ensure all tests pass
3. Document changes in `_project_progress/`
4. Submit a PR with a clear description
