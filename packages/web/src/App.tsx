import { useMemo } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { trpc } from "./hooks/trpc";
import Hello from './components/Hello'

const App = () => {
  const queryClient = useMemo(() => new QueryClient(), []);
  const trpcClient = useMemo(
    () =>
      trpc.createClient({
        url: "http://localhost:5000/trpc",
      }),
    []
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Hello />
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default App;
