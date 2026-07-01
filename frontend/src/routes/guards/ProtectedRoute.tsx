import {
  Navigate,
  Outlet,
} from "react-router-dom";

import { useAuthStore } from "@/store/auth.store";

import type { UserRole } from "@/types/auth";

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

export default function ProtectedRoute({
  allowedRoles,
}: ProtectedRouteProps) {
  const {
    isAuthenticated,
    user,
  } = useAuthStore();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (
    allowedRoles &&
    user &&
    !allowedRoles.includes(user.role)
  ) {
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
            to="/login"
            replace
          />
        );
    }
  }

  return <Outlet />;
}