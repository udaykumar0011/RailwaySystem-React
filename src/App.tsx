
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Trains from "./pages/Trains";
import TicketBooking from "./pages/TicketBooking";
import TrainSelection from "./pages/TrainSelection";
import Payment from "./pages/Payment";
import Ticket from "./pages/Ticket";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/trains" element={<Trains />} />
          <Route path="/ticket-booking" element={<TicketBooking />} />
          <Route path="/train-selection" element={<TrainSelection />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/ticket" element={<Ticket />} />
          {/* Add redirect from '/tickets' to '/ticket' */}
          <Route path="/tickets" element={<Navigate to="/ticket" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
