import RootLayout from "../layouts/RootLayout/RootLayout";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import Brands from "../pages/admin/Brands";
import BrandsModels from "../pages/admin/BrandsModels";
import AllShowrooms from "../pages/admin/Showrooms";
import CreateShowroom from "../pages/admin/Showrooms/CreateShowroom";
import Cars from "../pages/admin/Cars";
import CreateBrand from "../pages/admin/Brands/CreateBrand";
import CreateModel from "../pages/admin/BrandsModels/CreateModel";
import Privacy from "../pages/admin/privacy";
import TermsAndConditions from "../pages/admin/termsAndConditions";
import FAQs from "../pages/admin/faq/FAQs";
import Packages from "../pages/admin/packages";
import Banners from "./../pages/admin/banner/index";
import Subscriptions from "../pages/admin/subscriptions";
import ShowroomProfile from "../pages/admin/Showrooms/ShowroomProfile";
import CarProfile from "../pages/admin/Cars/CarProfile";
import CreateCar from "../pages/admin/Cars/CreateCar";
import Offers from "../pages/admin/Offers";
import CreateOffer from "../pages/admin/Offers/CreateOffer";
import CreateSubscriptions from "../pages/admin/subscriptions/CreateSubscriptions";
import Roles from "../pages/admin/roles";
import RolePermissionsManager from "../pages/admin/roles/Permissions";
import AllEmployees from "../pages/admin/employees";
import CreateEmployee from "../pages/admin/employees/CreateEmployee";
import Home from "../pages/admin/home";
import Features from "../pages/admin/Features";
import MyShowroomProfile from "../pages/admin/myProfile";

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
                {
                  path: "",
                  element: <Brands />,
                },
                {
                  path: "create",
                  element: <CreateBrand />,
                },
              ],
            },
            {
              path: "models",
              children: [
                {
                  path: "",
                  element: <BrandsModels />,
                },
                {
                  path: "create",
                  element: <CreateModel />,
                },
              ],
            },
            {
              path: "roles",
              children: [
                {
                  path: "",
                  element: <Roles />,
                },
                {
                  path: ":id",
                  element: <RolePermissionsManager />,
                },
              ],
            },
            {
              path: "employees",
              children: [
                {
                  path: "",
                  element: <AllEmployees />,
                },
                {
                  path: "create",
                  element: <CreateEmployee />,
                },
              ],
            },
            {
              path: "showrooms",
              children: [
                {
                  path: "",
                  element: <AllShowrooms />,
                },
                {
                  path: ":id",
                  element: <ShowroomProfile />,
                },
                {
                  path: "create",
                  element: <CreateShowroom />,
                },
              ],
            },
            {
              path: "packages",
              children: [
                {
                  path: "",
                  element: <Packages />,
                },
              ],
            },
            {
              path: "subscriptions",
              children: [
                {
                  path: "",
                  element: <Subscriptions />,
                },
                {
                  path: "create",
                  element: <CreateSubscriptions />,
                },
              ],
            },
            {
              path: "faqs",
              element: <FAQs />,
            },
            {
              path: "banners",
              element: <Banners />,
            },
            {
              path: "cars",
              children: [
                {
                  path: "",
                  element: <Cars />,
                },
                {
                  path: ":id",
                  element: <CarProfile />,
                },
                {
                  path: "create",
                  element: <CreateCar />,
                },
                {
                  path: "offers",
                  children: [
                    {
                      path: "",
                      element: <Offers />,
                    },
                    {
                      path: "create",
                      element: <CreateOffer />,
                    },
                  ],
                },
                {
                  path: "features",
                  children: [
                    {
                      path: "",
                      element: <Features />,
                    },
                  ],
                },
              ],
            },
            {
              path: "",
              element: <Home />,
            },
            {
              path: "my-profile",
              element: <MyShowroomProfile />,
            },
            {
              path: "privacy",
              element: <Privacy />,
            },
            {
              path: "terms-and-conditions",
              element: <TermsAndConditions />,
            },
          ],
        },
      ],
    },
  ],
};
