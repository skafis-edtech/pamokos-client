import { AppBar, Toolbar, Typography } from "@mui/material";

interface HeaderProps {
  isLoggedIn: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn }) => {
  return (
    <div id="desktop-header">
      <AppBar position="static">
        <Toolbar className="gap-4">
          <img alt="Skafis logo" src="/favicon-32x32.png" />
          <Typography
            variant="h2"
            component="div"
            className="flex-grow ml-2"
          ></Typography>

          <h3>
            <a href="/about" style={{ color: "white" }}>
              Apie
            </a>
          </h3>
          {isLoggedIn ? (
            <h3>
              <a href="/logout" style={{ color: "white" }}>
                Atsijungti
              </a>
            </h3>
          ) : (
            <h3>
              <a href="/" style={{ color: "white" }}>
                Prisijungti
              </a>
            </h3>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Header;
