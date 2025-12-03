import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoadingScreen } from "@/components/LoadingScreen";
import Index from "./pages/Index";
import Blocks from "./pages/Blocks";
import BlockDetail from "./pages/BlockDetail";
import Transactions from "./pages/Transactions";
import CreateTransaction from "./pages/CreateTransaction";
import WalletPage from "./pages/WalletPage";
import Mining from "./pages/Mining";
import Network from "./pages/Network";
import Health from "./pages/Health";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {isLoading ? (
          <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
        ) : (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/blocks" element={<Blocks />} />
              <Route path="/blocks/:hash" element={<BlockDetail />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/transactions/create" element={<CreateTransaction />} />
              <Route path="/transactions/:hash" element={<Transactions />} />
              <Route path="/wallet" element={<WalletPage />} />
              <Route path="/mining" element={<Mining />} />
              <Route path="/network" element={<Network />} />
              <Route path="/health" element={<Health />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
