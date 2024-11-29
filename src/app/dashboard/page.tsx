"use client";

import { useEffect, useState } from "react";
import Dashboard from "./_components/Dashboard";
import Login from "./_components/LoginDashboard";

const PrincipalDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("TokenAdmin");
    if (authStatus) {
      setIsAuthenticated(true);
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
