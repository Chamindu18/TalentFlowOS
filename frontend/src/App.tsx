import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import AppRoutes from "@/routes/configs/appRoutes";
import { useAuthStore } from "@/store/auth.store";

export default function App() {
  const initializeAuth = useAuthStore(
    (state) => state.initializeAuth,
  );

  useEffect(() => {
    void initializeAuth();
  }, [initializeAuth]);

  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <AppRoutes />
    </BrowserRouter>
  );
}