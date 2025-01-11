import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { User as FirebaseUser } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { UserRole } from "../types";
import { fetchUserRole } from "../services/firestore";

interface AuthContextType {
  currentUser: FirebaseUser | null;
  role: UserRole | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);

      if (user) {
        fetchUserRole(user.uid).then((role) => {
          setRole(role);
        });
      }

      setLoading(false);
    });

    return unsubscribe;
  }, [navigate]);

  if (loading) {
    return <h1>Kraunasi...</h1>;
  }

  return (
    <AuthContext.Provider value={{ currentUser, role }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
