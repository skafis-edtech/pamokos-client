import { useAuth } from "../../context/AuthContext";

const StudentDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  return (
    <>
      <h1>Mokinio {currentUser?.email || "Kraunasi..."} paskyra</h1>
      <div></div>
    </>
  );
};

export default StudentDashboard;
