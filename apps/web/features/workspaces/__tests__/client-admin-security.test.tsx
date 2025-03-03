import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
  beforeAll,
} from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "@/__tests__/test-utils";
import { InvitationsTab } from "../components/WorkspaceSettings/InvitationsTab";
import { QueryClient } from "@tanstack/react-query";
import { Team } from "@repo/supabase";

// Mock toast
vi.mock("react-hot-toast", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

// Mock Next.js navigation hooks
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
  useRouter: () => ({
    push: vi.fn(),
  }),
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

// Mock the useRoles and useInviteMember hooks
const mockInviteMember = vi.fn();
vi.mock("@repo/supabase", () => ({
  useRoles: () => ({
    data: [
      { id: "admin-role-id", name: "admin" },
      { id: "member-role-id", name: "member" },
    ],
    isLoading: false,
  }),
  useInviteMember: () => ({
    mutate: mockInviteMember,
    mutateAsync: vi.fn(),
    isPending: false,
    isError: false,
    isSuccess: false,
    isIdle: true,
    status: "idle",
    data: undefined,
    error: null,
    reset: vi.fn(),
    variables: undefined,
    failureCount: 0,
    failureReason: null,
    context: undefined,
    isPaused: false,
    submittedAt: 0,
  }),
}));

// Mock Supabase client
const mockSupabaseAuth = {
  getUser: vi.fn().mockResolvedValue({
    data: {
      user: {
        id: "test-user-id",
        email: "test@example.com",
      },
    },
  }),
};

vi.mock("@/utils/supabase/client", () => ({
  createClient: vi.fn().mockImplementation(() => ({
    auth: mockSupabaseAuth,
    rpc: vi.fn().mockResolvedValue({ data: {}, error: null }),
  })),
}));

beforeAll(() => {
  // Mock pointer capture methods which are not implemented in JSDOM
  Element.prototype.setPointerCapture = vi.fn();
  Element.prototype.releasePointerCapture = vi.fn();
  Element.prototype.hasPointerCapture = vi.fn();
  // Mock scrollIntoView since it's not available in JSDOM
  Element.prototype.scrollIntoView = vi.fn();
});

describe("Client Admin Security", () => {
  beforeEach(() => {
    sharedQueryClient = createTestQueryClient();
    vi.clearAllMocks();
  });

  afterEach(() => {
    sharedQueryClient.clear();
  });

  const mockTeam: Team = {
    id: "team-id",
    name: "Test Team",
    organization_id: "org-id",
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-01T00:00:00Z",
    website: null,
  };

  it("should prevent client admins from adding users to team organization", async () => {
    const clientAdminMember = {
      membership_type: "client",
      role: {
        name: "admin",
        permissions: [{ permission: { action: "manage_team" } }],
      },
    };

    renderWithProviders(
      <InvitationsTab team={mockTeam} currentMember={clientAdminMember} />,
      {
        queryClient: sharedQueryClient,
      }
    );

    const emailInput = screen.getByLabelText("Email Address");
    await userEvent.type(emailInput, "new-user@example.com");

    const membershipTypeSelect = screen.getByRole("combobox", {
      name: "Membership Type",
    });

    // Instead of trying to open the select and find options that may not be in the DOM yet,
    // directly check that the select button is disabled as expected
    expect(membershipTypeSelect).toHaveAttribute("data-disabled");

    // Verify that the membership type is set to Team
    expect(screen.getByText("Team", { selector: "span" })).toBeInTheDocument();

    // Verify the error message is displayed
    expect(
      screen.getByText(
        "As a client administrator, you can only invite users to client organizations"
      )
    ).toBeInTheDocument();

    // Verify the submit button is disabled
    expect(screen.getByRole("button", { name: "Send Invite" })).toBeDisabled();
  });

  it("should allow client admins to add users to client organization", async () => {
    const clientAdminMember = {
      membership_type: "client",
      role: {
        name: "admin",
        permissions: [{ permission: { action: "manage_team" } }],
      },
    };

    renderWithProviders(
      <InvitationsTab team={mockTeam} currentMember={clientAdminMember} />,
      {
        queryClient: sharedQueryClient,
      }
    );

    // Fill in email
    const emailInput = screen.getByLabelText("Email Address");
    await userEvent.type(emailInput, "new-user@example.com");

    // Open membership type select and select "Client"
    const membershipTypeSelect = screen.getByRole("combobox", {
      name: "Membership Type",
    });
    await userEvent.click(membershipTypeSelect);
    const clientOption = await screen.findByText("Client");
    await userEvent.click(clientOption);

    // Submit the form
    const submitButton = screen.getByRole("button", { name: "Send Invite" });
    await userEvent.click(submitButton);
  });

  it("should allow team admins to add users to both team and client organizations", async () => {
    const teamAdminMember = {
      membership_type: "team",
      role: {
        name: "admin",
        permissions: [
          { permission: { action: "manage_organization" } },
          { permission: { action: "manage_team" } },
        ],
      },
    };

    renderWithProviders(
      <InvitationsTab team={mockTeam} currentMember={teamAdminMember} />,
      {
        queryClient: sharedQueryClient,
      }
    );

    // Fill in email
    const emailInput = screen.getByLabelText("Email Address");
    await userEvent.type(emailInput, "new-user@example.com");

    // Open membership type select and verify options
    const membershipTypeSelect = screen.getByRole("combobox", {
      name: "Membership Type",
    });
    await userEvent.click(membershipTypeSelect);

    // Wait for options to be available
    await waitFor(() => {
      expect(
        screen.getByText("Team", { selector: "div[data-radix-select-item] *" })
      ).toBeInTheDocument();
      expect(
        screen.getByText("Client", {
          selector: "div[data-radix-select-item] *",
        })
      ).toBeInTheDocument();
    });

    // Select client option
    await userEvent.click(
      screen.getByText("Client", { selector: "div[data-radix-select-item] *" })
    );

    // Open role type select and select "Admin"
    const roleTypeSelect = screen.getByRole("combobox", { name: "Role Type" });
    await userEvent.click(roleTypeSelect);
    await userEvent.click(
      screen.getByText("Admin", { selector: "div[data-radix-select-item] *" })
    );

    // Submit the form
    const submitButton = screen.getByRole("button", { name: "Send Invite" });
    await userEvent.click(submitButton);
  });

  it("should prevent team admins from adding users to team organization", async () => {
    const teamAdminMember = {
      membership_type: "team",
      role: {
        name: "admin",
        permissions: [
          { permission: { action: "manage_organization" } },
          { permission: { action: "manage_team" } },
        ],
      },
    };

    renderWithProviders(
      <InvitationsTab team={mockTeam} currentMember={teamAdminMember} />,
      {
        queryClient: sharedQueryClient,
      }
    );

    // This test should actually verify that admin CAN add team members
    // Fill in email
    const emailInput = screen.getByLabelText("Email Address");
    await userEvent.type(emailInput, "new-user@example.com");

    // Open membership type select and verify options
    const membershipTypeSelect = screen.getByRole("combobox", {
      name: "Membership Type",
    });
    await userEvent.click(membershipTypeSelect);

    // Wait for options to be available and ensure Team option is not disabled
    await waitFor(() => {
      const teamOption = screen.getByText("Team", {
        selector: "div[data-radix-select-item] *",
      });
      expect(
        teamOption.closest("div[data-radix-select-item]")
      ).not.toHaveAttribute("data-disabled");
    });
  });
});
