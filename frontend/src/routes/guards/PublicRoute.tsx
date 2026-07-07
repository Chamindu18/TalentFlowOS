import {
  Navigate,
  Outlet,
} from "react-router-dom";

import { useAuthStore } from "@/store/auth.store";

export default function PublicRoute() {
  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated,
  );

  const user = useAuthStore(
    (state) => state.user,
  );

  if (isAuthenticated && user) {
    switch (user.role) {
      case "Candidate":
        return (
          <Navigate
            to="/candidate/dashboard"
            replace
          />
        );

      case "Recruiter":
        return (
          <Navigate
            to="/recruiter/dashboard"
            replace
          />
        );

      case "Admin":
        return (
          <Navigate
            to="/admin/dashboard"
            replace
          />
        );

      default:
        return (
          <Navigate
            to="/"
            replace
          />
        );
    }
  }

  return <Outlet />;
}