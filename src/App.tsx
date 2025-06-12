import {RouterProvider} from "react-router-dom";
import { ThemeProvider } from '@/components/Providers/theme-provider';
import router from "./router";


function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-screen">
        <main>
          <RouterProvider router={router} />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
