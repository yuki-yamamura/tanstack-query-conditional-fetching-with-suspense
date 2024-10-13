"use client";

import {
  QueryClient,
  QueryClientProvider as Provider,
} from "@tanstack/react-query";

export const QueryClientProvider = ({ children }: React.PropsWithChildren) => {
  const queryClient = new QueryClient();

  return <Provider client={queryClient}>{children}</Provider>;
};
