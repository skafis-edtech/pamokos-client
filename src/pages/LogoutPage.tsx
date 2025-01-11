import { useEffect } from "react";
import { logoutUser } from "../services/firestore";

const LogoutPage: React.FC = () => {
  useEffect(() => {
    logoutUser();
  }, []);

  return (
    <div>
      <h1>Logging out...</h1>
    </div>
  );
};

export default LogoutPage;
