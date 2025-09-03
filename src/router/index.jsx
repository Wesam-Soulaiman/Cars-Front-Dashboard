import { createBrowserRouter } from "react-router-dom";
import { authRoutes } from "./authRoutes";
import errorsRoutes from "./errorsRoutes";
import { adminRoutes } from "./adminRoutes";
// import { showroomRoutes } from "./coachRoutes";

export const appRouter = () => {
  return createBrowserRouter([
    authRoutes,
    adminRoutes,
    // showroomRoutes,
    ...errorsRoutes,
  ]);
};
