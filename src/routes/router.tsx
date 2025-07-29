import { createBrowserRouter } from "react-router";
import Main from "@/layouts/Main";
import { About, Teams, Tasks, Billing, Content, Admin } from "@/pages";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Main,
    children: [
        { index: true, Component: Admin },
        { path: "/teams", Component: Teams },
        { path: "/tasks", Component: Tasks },
        { path: "/admin", Component: Admin },
        { path: "/billing", Component: Billing },
        { path: "/content", Component: Content },
    ],
  },
  {
     path: "/about", Component: About,
  }
]);