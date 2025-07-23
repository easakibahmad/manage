import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import Teams from "../pages/Teams";
import HomeLayout from "../layouts/HomeLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
        { index: true, Component: Home },
        { path: "/teams", Component: Teams },
    ],
  },
]);