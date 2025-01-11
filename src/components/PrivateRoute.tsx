import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MobileHeader from "./MobileHeader";
import DesktopHeader from "./DesktopHeader";

const PrivateRoute: React.FC = () => {
  const { currentUser } = useAuth();

  return currentUser ? (
    <>
      <header>
        <MobileHeader isLoggedIn={currentUser !== null} />
        <DesktopHeader isLoggedIn={currentUser !== null} />
      </header>
      <main>
        <aside></aside>
        <section>
          <Outlet />
        </section>
        <aside></aside>
      </main>
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;
