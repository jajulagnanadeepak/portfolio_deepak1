import React from 'react';
import { Navigate } from 'react-router-dom';

interface RequireAdminProps {
  children: React.ReactNode;
}

export default function RequireAdmin({ children }: RequireAdminProps): JSX.Element {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (!token) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
}


