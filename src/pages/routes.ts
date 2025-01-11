import { FC } from "react";
import AboutPage from "./AboutPage";
import DashboardPage from "./DashboardPage";
import HomeLoginPage from "./HomeLoginPage";
import LogoutPage from "./LogoutPage";

export interface IRoute {
  path: string;
  title: string;
  element: FC;
}

export const publicRoutes: IRoute[] = [
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
];

export const privateRoutes: IRoute[] = [
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
