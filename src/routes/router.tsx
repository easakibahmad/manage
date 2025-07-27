import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import About from "../pages/About";
import Teams from "../pages/Teams";
import Tasks from "../pages/Tasks";
import AdminDashboard from "../components/AdminDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
        { index: true, Component: AdminDashboard },
        { path: "/teams", Component: Teams },
        { path: "/tasks", Component: Tasks },
        { path: "/admin", Component: AdminDashboard },
    ],
  },
  {
     path: "/about", Component: About,
  }
]);