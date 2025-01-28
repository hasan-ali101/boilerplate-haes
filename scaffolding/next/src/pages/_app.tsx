import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";
import {
  HydrationBoundary,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { Toaster } from "@/components/toaster";
import { useToast } from "@/hooks/use-toast";

export default function App({ Component, pageProps }: AppProps) {
  const { toast } = useToast();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
        queryCache: new QueryCache({
          onError: (error, query) => {
            const description =
              query.meta?.errorMessage ||
              "There was a problem with your request. Please try again.";
            toast({
              variant: "destructive",
              title: "Something went wrong.",
              description,
            });
          },
        }),
      })
  );

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={pageProps.dehydratedState}>
          <Component {...pageProps} />
          <Toaster />
        </HydrationBoundary>
      </QueryClientProvider>
    </>
  );
}
