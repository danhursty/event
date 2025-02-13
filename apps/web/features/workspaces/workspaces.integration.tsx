import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "@/__tests__/test-utils";
import {
  createTestUser,
  createTestOrganization,
  createTestMember,
} from "@repo/supabase";
import { createAuthenticatedClient } from "@/integration/test-utils";
import { WorkspacesContent } from "./components/WorkspacesContent";
import { dehydrate, QueryClient } from "@tanstack/react-query";

// Mock Next.js navigation hooks
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

// Create a shared query client for tests
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

let sharedQueryClient: QueryClient;

// Mock createQueryClient to use our test query client
vi.mock("@/lib/react-query", () => ({
  createQueryClient: () => sharedQueryClient,
}));

describe("Workspaces Feature", () => {
  beforeEach(() => {
    // Create a fresh query client for each test
    sharedQueryClient = createTestQueryClient();
  });

  afterEach(() => {
    // Clear query client after each test
    sharedQueryClient.clear();
    vi.clearAllMocks();
  });

  describe("Team Admin", () => {
    it("should be able to view all workspaces", async () => {
      // Create test data
      const { user, token } = await createTestUser({});
      const { organization, team, roles } = await createTestOrganization({
        userId: user.id,
        name: "Test Organization",
        asAdmin: true, // Ensure user is created as admin
      });

      // Create organization member with admin role
      await createTestMember({
        organizationId: organization.id,
        teamId: team.id,
        userId: user.id,
        isAdmin: true,
        membershipType: "team",
        roles,
      });

      // Create an authenticated client that will be used for both
      // server-side operations and client-side mocking
      const supabase = createAuthenticatedClient(token);

      // Mock the Supabase client for client-side component
      vi.mock("@/utils/supabase/client", () => ({
        createClient: vi.fn().mockImplementation(() => ({
          ...supabase,
        })),
      }));

      // Get an empty dehydrated state
      const dehydratedState = dehydrate(sharedQueryClient);

      // Render the component with the dehydrated state
      renderWithProviders(
        <WorkspacesContent
          state={dehydratedState}
          orgId={organization.id}
          user={user}
        />,
        {
          queryClient: sharedQueryClient,
        }
      );

      // Wait for the content with more detailed error handling
      await waitFor(
        () => {
          const element = screen.getByText("Test Organization");
          expect(element).toBeInTheDocument();
        },
        {
          timeout: 5000,
          onTimeout: (error) => {
            console.error("Timeout waiting for content:", {
              error,
              html: document.body.innerHTML,
            });
            return error;
          },
        }
      );
    });

    it("should be able to create new workspace", async () => {
      // Create test data
      const { user, token } = await createTestUser({});
      const { organization, team, roles } = await createTestOrganization({
        userId: user.id,
        name: "Initial Organization",
        asAdmin: true,
      });

      // Create organization member with admin role
      await createTestMember({
        organizationId: organization.id,
        teamId: team.id,
        userId: user.id,
        isAdmin: true,
        membershipType: "team",
        roles,
      });

      // Create an authenticated client that will be used for both
      // server-side operations and client-side mocking
      const supabase = createAuthenticatedClient(token);

      // Mock the Supabase client for client-side component
      vi.mock("@/utils/supabase/client", () => ({
        createClient: vi.fn().mockImplementation(() => ({
          ...supabase,
        })),
      }));

      // Get an empty dehydrated state
      const dehydratedState = dehydrate(sharedQueryClient);

      // Render the component with dehydrated state
      renderWithProviders(
        <WorkspacesContent
          state={dehydratedState}
          orgId={organization.id}
          user={user}
        />
      );

      // Verify create button is visible
      const createButton = await screen.findByRole("button", {
        name: /create workspace/i,
      });
      expect(createButton).toBeInTheDocument();

      // Click create button
      await userEvent.click(createButton);

      // Verify modal opens
      expect(await screen.findByRole("dialog")).toBeInTheDocument();

      // Fill in workspace details
      await userEvent.type(
        screen.getByLabelText(/workspace name/i),
        "New Workspace"
      );
    });

    it("should be able to manage workspace settings", async () => {
      // Create test data
      const { user, token } = await createTestUser({});
      const { organization, team, roles } = await createTestOrganization({
        userId: user.id,
        name: "Test Organization",
        asAdmin: true,
      });

      // Create organization member with admin role
      await createTestMember({
        organizationId: organization.id,
        teamId: team.id,
        userId: user.id,
        isAdmin: true,
        membershipType: "team",
        roles,
      });

      // Create an authenticated client that will be used for both
      // server-side operations and client-side mocking
      const supabase = createAuthenticatedClient(token);

      // Mock the Supabase client for client-side component
      vi.mock("@/utils/supabase/client", () => ({
        createClient: vi.fn().mockImplementation(() => ({
          ...supabase,
        })),
      }));

      // Get an empty dehydrated state
      const dehydratedState = dehydrate(sharedQueryClient);

      // Render the component with dehydrated state
      renderWithProviders(
        <WorkspacesContent
          state={dehydratedState}
          orgId={organization.id}
          user={user}
        />
      );

      // Find and click settings button
      const settingsButton = await screen.findByRole("button", {
        name: /settings/i,
      });
      expect(settingsButton).toBeInTheDocument();

      // Click settings button
      await userEvent.click(settingsButton);

      // Verify settings modal opens
      expect(await screen.findByRole("dialog")).toBeInTheDocument();
    });
  });
});
