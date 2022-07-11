import { useMemo } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { trpc } from "./hooks/trpc";
import AppBody from "./components/AppBody";

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
        <AppBody />
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default App;
