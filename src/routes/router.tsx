import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home";
import Teams from "../pages/Teams";
import Tasks from "../pages/Tasks";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
        { index: true, Component: Home },
        { path: "/teams", Component: Teams },
        { path: "/tasks", Component: Tasks },
    ],
  },
]);