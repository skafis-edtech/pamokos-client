import { useAuth } from "../../context/AuthContext";

const DashboardPage: React.FC = () => {
  const { currentUser, role } = useAuth();
  return (
    <>
      <h1>
        {role}
        {currentUser?.email || "Kraunasi..."}
      </h1>
    </>
  );
};

export default DashboardPage;
