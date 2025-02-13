import { QueryClient, type QueryClientConfig } from "@tanstack/react-query";

// Ensure we only create one instance
export const queryOptions: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 0,
    },
    mutations: {
      retry: 0,
    },
  },
};

export const createQueryClient = () => new QueryClient(queryOptions);
