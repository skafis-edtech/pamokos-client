import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Link,
  Container,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router";
import { loginUser, restorePassword } from "../services/firestore";

const HomeLoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    await loginUser(email, password).then(() => navigate("/dashboard"));
  };

  const handlePasswordReset = async () => {
    await restorePassword(email).then(() =>
      alert("Email sent from noreply@pamokos-skafis.firebaseapp.com")
    );
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Grupinės matematikos pamokos
        </Typography>
        <Link href="/about" variant="body2">
          Apie
        </Link>
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            margin="normal"
            id="email"
            label="Email address"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
          <Button
            variant="text"
            color="info"
            onClick={handlePasswordReset}
            fullWidth
            sx={{ mt: 1 }}
          >
            Restore password
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default HomeLoginPage;
