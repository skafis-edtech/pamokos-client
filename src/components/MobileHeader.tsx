import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

interface HeaderProps {
  isLoggedIn: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn }) => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box>
      <List>
        {isLoggedIn ? (
          <ListItem
            key="logout"
            disablePadding
            onClick={() => (window.location.href = "/")}
          >
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Atsijungti" />
            </ListItemButton>
          </ListItem>
        ) : (
          <ListItem
            key="login"
            disablePadding
            onClick={() => (window.location.href = "/logout")}
          >
            <ListItemButton>
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary="Prisijungti" />
            </ListItemButton>
          </ListItem>
        )}
        <ListItem
          key="about"
          disablePadding
          onClick={() => (window.location.href = "/about")}
        >
          <ListItemButton>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="Apie" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  return (
    <div id="mobile-header">
      <AppBar position="static">
        <Toolbar>
          <img alt="Skafis logo" src="/favicon-32x32.png" />
          <Typography
            variant="h2"
            component="div"
            sx={{ flexGrow: 1, ml: 2 }}
          ></Typography>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <div>
            <Drawer open={open} anchor="right" onClose={toggleDrawer(false)}>
              {DrawerList}
            </Drawer>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Header;
