import AboutPage from "./AboutPage";
import DashboardPage from "./DashboardPage";
import HomeLoginPage from "./HomeLoginPage";
import LogoutPage from "./LogoutPage";

export const routes = [
  {
    path: "/",
    title: "HomeLogin",
    element: HomeLoginPage,
  },
  {
    path: "/about",
    title: "About",
    element: AboutPage,
  },
  {
    path: "/dashboard",
    title: "Dashboard",
    element: DashboardPage,
  },
  {
    path: "/logout",
    title: "Logout",
    element: LogoutPage,
  },
  {
    path: "*",
    title: "HomeLogin",
    element: HomeLoginPage,
  },
];
