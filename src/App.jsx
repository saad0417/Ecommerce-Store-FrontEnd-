import { Suspense } from "react";
import { useSelector } from "react-redux";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { Navbar, Footer } from "./components/index";
import Loader from "./components/Loader";
import { Analytics } from "@vercel/analytics/react";

function App() {
  const loading = useSelector((state) => state.loader.loading);

  return (
    <div className="flex min-h-screen flex-col bg-surface-50 text-ink-900">

      {/* Bars loader — for API/data fetching via Redux dispatch */}
      <Loader 
      loading={loading} 
      variant="bars" 
      fullPage 
      />

      <ScrollRestoration />
      <Navbar />

      <main className="flex-1 animate-page-in bg-[#F0F0F0]">

        {/* Suspense — for React.lazy() page bundle downloading */}
        <Suspense fallback={
          <div className="flex min-h-[60vh] items-center justify-center">
            <Loader loading={true} variant="bars" />  {/* same bars, consistent UI */}
          </div>
        }>
          <Outlet />
        </Suspense>

      </main>

      <Footer />
      <Analytics />
    </div>
  );
}

export default App;