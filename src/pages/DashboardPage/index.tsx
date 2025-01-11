import { useAuth } from "../../context/AuthContext";
import StudentDashboard from "./StudentDashboard";
import TeacherDashboard from "./TeacherDashboard";

const DashboardPage: React.FC = () => {
  const { role } = useAuth();

  return (
    <>
      {role === "STUDENT" ? (
        <StudentDashboard />
      ) : role === "TEACHER" ? (
        <TeacherDashboard />
      ) : (
        <h1>User role {role} is ILLEGAL :OOOOO</h1>
      )}
    </>
  );
};

export default DashboardPage;
