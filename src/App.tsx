import {RouterProvider} from "react-router-dom";
import { ThemeProvider } from '@/components/Providers/theme-provider';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import router from "./router";
import { Toaster } from "sonner";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <QueryClientProvider client={new QueryClient()}>
        <div className="min-h-screen">
          <main>
            <RouterProvider router={router} />
            <Toaster richColors position="top-right" />
          </main>
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
