import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";

import AppRoutes from "@/routes/configs/appRoutes";
import AppLoader from "@/components/common/AppLoader";
import { useAuthStore } from "@/store/auth.store";

export default function App() {
  const initializeAuth = useAuthStore(
    (state) => state.initializeAuth,
  );

  const [isInitializing, setIsInitializing] = useState<boolean>(true);

  useEffect(() => {
    const init = async () => {
      initializeAuth();

      // Small delay for smoother UX
      setTimeout(() => {
        setIsInitializing(false);
      }, 500);
    };

    init();
  }, [initializeAuth]);

  if (isInitializing) {
    return <AppLoader />;
  }

  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors closeButton duration={3000} />
      <AppRoutes />
    </BrowserRouter>
  );
}