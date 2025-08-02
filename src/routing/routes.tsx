import { createBrowserRouter } from "react-router-dom";
import HomePage from "./HomePage";
import UserList from "./UserList";
import UserDetailPage from "./UserDetailPage";
import Layout from "./Layout";
import UsersPage from "./UsersPage";
import ErrorPage from "./ErrorPage";
import LoginPage from "./LoginPage";
import { PrivateRoutes } from "./PrivateRoutes";

const router = createBrowserRouter([
  // Nested structure
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    //The path of the children routes must be relative to the parent path (/)
    children: [
      // Defines what can be show in the Outlet of UsersPage
      { index: true, element: <HomePage /> }, //Default component to be rendered inside the <Outlet>
      { path: "login", element: <LoginPage /> },
    ],
  },

  //Layout route: Enforce layout or business rules in a single place
  {
    element: <PrivateRoutes />,
    children: [
      //Add routes that need to be protected
      {
        path: "users",
        element: <UsersPage />,
        children: [
          // Defines what can be show in the outlet of UsersPage
          { path: ":id", element: <UserDetailPage /> }, //Pass data with route parameters to other components (through the URL)
        ],
      },
    ],
  },
]);

export default router;
