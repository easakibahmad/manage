import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import About from "../pages/About";
import Teams from "../pages/Teams";
import Tasks from "../pages/Tasks";
import AdminDashboard from "../components/AdminDashboard";
import Billing from "../pages/Billing";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
        { index: true, Component: AdminDashboard },
        { path: "/teams", Component: Teams },
        { path: "/tasks", Component: Tasks },
        { path: "/admin", Component: AdminDashboard },
        { path: "/billing", Component: Billing },
    ],
  },
  {
     path: "/about", Component: About,
  }
]);