"use client";

import { useEffect, useState } from "react";
import Dashboard from "./_components/Dashboard";
import Login from "./_components/LoginDashboard";

const PrincipalDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("TokenAdmin");
    const expiration = localStorage.getItem("TokenAdminExpiration");
    const now = new Date().getTime();
  
    if (token && expiration && now < parseInt(expiration)) {
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem("TokenAdmin");
      localStorage.removeItem("TokenAdminExpiration");
      localStorage.removeItem("isAuthenticatedAdmin");
      setIsAuthenticated(false);
    }
    setIsLoading(true);
  }, []);

  const handleAuthentication = (status: boolean) => {
    setIsAuthenticated(status);
  };

  if (!isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Login onAuthenticate={handleAuthentication} />;
  }

  return (
    <>
      <Dashboard />
    </>
  );
};

export default PrincipalDashboard;
