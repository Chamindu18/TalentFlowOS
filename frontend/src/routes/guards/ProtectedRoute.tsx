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

  // User is not logged in
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // User does not have permission
  if (
    allowedRoles &&
    user &&
    !allowedRoles.includes(user.role)
  ) {
    return (
      <Navigate
        to="/unauthorized"
        replace
      />
    );
  }

  return <Outlet />;
}