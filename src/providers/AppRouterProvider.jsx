import React from "react";
import { RouterProvider } from "react-router";
import { appRouter } from "../router";
import RTL from "../components/RTL";

const AppRouterProvider = () => {
  return (
    <RTL>
      <RouterProvider router={appRouter()} />
    </RTL>
  );
};

export default AppRouterProvider;
