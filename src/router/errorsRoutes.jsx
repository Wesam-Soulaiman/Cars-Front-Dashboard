import RootLayout from "../layouts/RootLayout/RootLayout";
import NotFound404 from "../pages/errors/_404";

export const NotFound = {
  path: "",
  element: <RootLayout />,
  children: [
    {
      path: "*",
      element: <NotFound404 />,
    },
  ],
};

const errors = [NotFound];

export default errors;
