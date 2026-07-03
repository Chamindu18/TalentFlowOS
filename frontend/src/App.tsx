import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import AppRoutes from "@/routes/configs/appRoutes";

import AppLoader from "@/components/common/AppLoader";

import { useAuthStore } from "@/store/auth.store";

export default function App() {
  const initializeAuth = useAuthStore(
    (state) => state.initializeAuth,
  );

  const [isInitializing, setIsInitializing] =
    useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        await initializeAuth();
      } finally {
        setIsInitializing(false);
      }
    };

    init();
  }, [initializeAuth]);

  if (isInitializing) {
    return <AppLoader />;
  }

  return (
    <BrowserRouter>
      <Toaster position="top-right" />

      <AppRoutes />
    </BrowserRouter>
  );
}