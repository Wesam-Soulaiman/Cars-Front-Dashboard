import MinimalLayout from "../layouts/MinimalLayout/MinimalLayout";
import Login from "../pages/auth/Login";

export const authRoutes = {
  path: "auth",
  element: <MinimalLayout />,
  children: [
    {
      path: "login",
      element: <Login />,
    },
  ],
};
