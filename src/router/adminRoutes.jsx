import Loadable from "../components/Loadable";
import { lazy } from "react";

import RootLayout from "../layouts/RootLayout/RootLayout";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import Home from "../pages/admin/home";

// Admin Pages
const Brands = Loadable(lazy(() => import("../pages/admin/Brands")));
const BrandsModels = Loadable(
  lazy(() => import("../pages/admin/BrandsModels"))
);
const AllShowrooms = Loadable(lazy(() => import("../pages/admin/Showrooms")));
const CreateShowroom = Loadable(
  lazy(() => import("../pages/admin/Showrooms/CreateShowroom"))
);
const Cars = Loadable(lazy(() => import("../pages/admin/Cars")));
const CreateBrand = Loadable(
  lazy(() => import("../pages/admin/Brands/CreateBrand"))
);
const CreateModel = Loadable(
  lazy(() => import("../pages/admin/BrandsModels/CreateModel"))
);
const Privacy = Loadable(lazy(() => import("../pages/admin/privacy")));
const TermsAndConditions = Loadable(
  lazy(() => import("../pages/admin/termsAndConditions"))
);
const FAQs = Loadable(lazy(() => import("../pages/admin/faq/FAQs")));
const Packages = Loadable(lazy(() => import("../pages/admin/packages")));
const Banners = Loadable(lazy(() => import("../pages/admin/banner/index")));
const Subscriptions = Loadable(
  lazy(() => import("../pages/admin/subscriptions"))
);
const ShowroomProfile = Loadable(
  lazy(() => import("../pages/admin/Showrooms/ShowroomProfile"))
);
const CarProfile = Loadable(
  lazy(() => import("../pages/admin/Cars/CarProfile"))
);
const CreateCar = Loadable(lazy(() => import("../pages/admin/Cars/CreateCar")));
const Offers = Loadable(lazy(() => import("../pages/admin/Offers")));
const CreateOffer = Loadable(
  lazy(() => import("../pages/admin/Offers/CreateOffer"))
);
const CreateSubscriptions = Loadable(
  lazy(() => import("../pages/admin/subscriptions/CreateSubscriptions"))
);
const Roles = Loadable(lazy(() => import("../pages/admin/roles")));
const RolePermissionsManager = Loadable(
  lazy(() => import("../pages/admin/roles/Permissions"))
);
const AllEmployees = Loadable(lazy(() => import("../pages/admin/employees")));
const CreateEmployee = Loadable(
  lazy(() => import("../pages/admin/employees/CreateEmployee"))
);
const Features = Loadable(lazy(() => import("../pages/admin/Features")));
const MyShowroomProfile = Loadable(
  lazy(() => import("../pages/admin/myProfile"))
);
const Fuels = Loadable(lazy(() => import("../pages/admin/Fuels")));
const Gears = Loadable(lazy(() => import("../pages/admin/Gears")));
const Colors = Loadable(lazy(() => import("../pages/admin/Colors")));
const Lights = Loadable(lazy(() => import("../pages/admin/Lights")));
const Structures = Loadable(lazy(() => import("../pages/admin/Structures")));
const StoreType = Loadable(lazy(() => import("../pages/admin/StoreType")));
const CarPartCategories = Loadable(
  lazy(() => import("../pages/admin/CarPartCategories"))
);
const CarParts = Loadable(lazy(() => import("../pages/admin/CarParts")));
const CreateCarParts = Loadable(
  lazy(() => import("../pages/admin/CarParts/CreateCarParts"))
);

export const adminRoutes = {
  path: "",
  element: <RootLayout />,
  children: [
    {
      path: "admin",
      element: <AdminLayout />,
      children: [
        {
          path: "dashboard",
          children: [
            {
              path: "brands",
              children: [
                { path: "", element: <Brands /> },
                { path: "create", element: <CreateBrand /> },
              ],
            },
            {
              path: "models",
              children: [
                { path: "", element: <BrandsModels /> },
                { path: "create", element: <CreateModel /> },
              ],
            },
            {
              path: "roles",
              children: [
                { path: "", element: <Roles /> },
                { path: ":id", element: <RolePermissionsManager /> },
              ],
            },
            {
              path: "employees",
              children: [
                { path: "", element: <AllEmployees /> },
                { path: "create", element: <CreateEmployee /> },
              ],
            },
            {
              path: "showrooms",
              children: [
                { path: "", element: <AllShowrooms /> },
                { path: "types", element: <StoreType /> },
                { path: ":id", element: <ShowroomProfile /> },
                { path: "create", element: <CreateShowroom /> },
              ],
            },
            { path: "packages", element: <Packages /> },
            {
              path: "subscriptions",
              children: [
                { path: "", element: <Subscriptions /> },
                { path: "create", element: <CreateSubscriptions /> },
              ],
            },
            { path: "faqs", element: <FAQs /> },
            { path: "banners", element: <Banners /> },
            {
              path: "cars",
              children: [
                { path: "", element: <Cars /> },
                { path: ":id", element: <CarProfile /> },
                { path: "create", element: <CreateCar /> },
                {
                  path: "offers",
                  children: [
                    { path: "", element: <Offers /> },
                    { path: "create", element: <CreateOffer /> },
                  ],
                },
                {
                  path: "parts",
                  children: [
                    { path: "", element: <CarParts /> },
                    { path: "create", element: <CreateCarParts /> },
                    { path: "categories", element: <CarPartCategories /> },
                  ],
                },
                { path: "fuels", element: <Fuels /> },
                { path: "gears", element: <Gears /> },
                { path: "colors", element: <Colors /> },
                { path: "lights", element: <Lights /> },
                { path: "structures", element: <Structures /> },
                { path: "features", element: <Features /> },
              ],
            },
            { path: "", element: <Home /> },
            { path: "my-profile", element: <MyShowroomProfile /> },
            { path: "privacy", element: <Privacy /> },
            { path: "terms-and-conditions", element: <TermsAndConditions /> },
          ],
        },
      ],
    },
  ],
};
