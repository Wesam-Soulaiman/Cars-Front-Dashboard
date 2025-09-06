import { MdHome, MdOutlinePayments } from "react-icons/md";
import { IoLogoModelS } from "react-icons/io";
import { FaCirclePlus } from "react-icons/fa6";
import { FcPrivacy } from "react-icons/fc";
import { FcFaq } from "react-icons/fc";
import { FcRules } from "react-icons/fc";
import { PiFlagBannerFold } from "react-icons/pi";
import { BiSolidOffer } from "react-icons/bi";
import { IoPeople } from "react-icons/io5";
import { BiTask } from "react-icons/bi";
import { GiCarSeat } from "react-icons/gi";
import { BsFillFuelPumpFill } from "react-icons/bs";
// import { GiCarWheel } from "react-icons/gi";
import { GiGearStickPattern } from "react-icons/gi";
import { PiHeadlightsBold } from "react-icons/pi";
import { MdOutlineDirectionsCar } from "react-icons/md";
import { FaStoreAlt } from "react-icons/fa";
import { MdColorLens } from "react-icons/md";

export const adminMenuItems = [
  {
    title: "dashboard",
    type: "group",
    children: [
      {
        id: "admin-home",
        path: "/admin/dashboard",
        title: "home",
        type: "item",
        icon: <MdHome size={30} />,
        external: false,
        permission: "dashboard.access",
      },
    ],
  },
  {
    id: "employee-man",
    title: "employee",
    type: "group",
    children: [
      {
        id: "role",
        title: "role",
        path: "/admin/dashboard/roles",
        icon: <BiTask size={25} />,
        type: "item",
        permission: "roles.view",
      },
      {
        id: "employee-management",
        type: "coollabse",
        title: "employee_man",
        children: [
          {
            id: "employee",
            title: "employee",
            path: "/admin/dashboard/employees",
            icon: <IoPeople size={25} />,
            type: "item",
            permission: "employees.view",
          },
          {
            id: "employee-create",
            title: "employee_create",
            path: "/admin/dashboard/employees/create",
            icon: <FaCirclePlus size={25} />,
            type: "item",
            permission: "employees.create",
          },
        ],
      },
    ],
  },

  {
    id: "showroom-man",
    title: "showrooms",
    type: "group",
    children: [
      {
        id: "showroom-management",
        type: "coollabse",
        title: "showroom_man",
        children: [
          {
            id: "showroom",
            title: "showroom",
            path: "/admin/dashboard/showrooms",
            icon: <IoLogoModelS size={25} />,
            type: "item",
            permission: "stores.view",
          },
          {
            id: "showroom-create",
            title: "showroom_create",
            path: "/admin/dashboard/showrooms/create",
            icon: <FaCirclePlus size={25} />,
            type: "item",
            permission: "stores.create",
          },
        ],
      },
      {
        id: "store-types",
        title: "storeType",
        path: "/admin/dashboard/showrooms/types",
        icon: <FaStoreAlt size={25} />,
        type: "item",
        permission: "store_type.view",
      },
    ],
  },
  {
    id: "car-parts-man",
    title: "parts",
    type: "group",
    children: [
      {
        id: "car-parts-management",
        type: "coollabse",
        title: "cars_parts_man",
        children: [
          {
            id: "parts",
            title: "parts",
            path: "/admin/dashboard/cars/parts",
            icon: <IoLogoModelS size={25} />,
            type: "item",
            permission: "car_part.view",
          },
          {
            id: "parts-create",
            title: "parts_create",
            path: "/admin/dashboard/cars/parts/create",
            icon: <FaCirclePlus size={25} />,
            type: "item",
            permission: "car_part.create",
          },
        ],
      },
      {
        id: "car-part-categories",
        title: "parts_categories",
        path: "/admin/dashboard/cars/parts/categories",
        icon: <FaCirclePlus size={25} />,
        type: "item",
        permission: "car_part_categories.create",
      },
    ],
  },
  {
    id: "car-man",
    title: "cars",
    type: "group",
    children: [
      {
        id: "car-management",
        type: "coollabse",
        title: "cars_man",
        children: [
          {
            id: "car",
            title: "car",
            path: "/admin/dashboard/cars",
            icon: <IoLogoModelS size={25} />,
            type: "item",
            permission: "products.view",
          },
          {
            id: "car-create",
            title: "car_create",
            path: "/admin/dashboard/cars/create",
            icon: <FaCirclePlus size={25} />,
            type: "item",
            permission: "products.create",
          },
        ],
      },

      {
        id: "offers-management",
        type: "coollabse",
        title: "offers_man",
        children: [
          {
            id: "offer",
            title: "offer",
            path: "/admin/dashboard/cars/offers",
            icon: <BiSolidOffer size={25} />,
            type: "item",
            permission: "offers.view",
          },
          {
            id: "offer-create",
            title: "offer_create",
            path: "/admin/dashboard/cars/offers/create",
            icon: <FaCirclePlus size={25} />,
            type: "item",
            permission: "offers.create",
          },
        ],
      },
      {
        id: "info-management",
        type: "coollabse",
        title: "car_info_man",
        children: [
          {
            id: "fuel",
            title: "fuel",
            path: "/admin/dashboard/cars/fuels",
            icon: <BsFillFuelPumpFill size={25} />,
            type: "item",
            permission: "fuel_type.create",
          },
          // {
          //   id: "drive",
          //   title: "drive",
          //   path: "/admin/dashboard/cars/drives",
          //   icon: <GiCarWheel size={25} />,
          //   type: "item",
          //   permission: "offers.create",
          // },
          {
            id: "gear",
            title: "gear",
            path: "/admin/dashboard/cars/gears",
            icon: <GiGearStickPattern size={25} />,
            type: "item",
            permission: "gear.create",
          },
          {
            id: "color",
            title: "color",
            path: "/admin/dashboard/cars/colors",
            icon: <MdColorLens size={25} />,
            type: "item",
            permission: "color.create",
          },
          {
            id: "lights",
            title: "lights",
            path: "/admin/dashboard/cars/lights",
            icon: <PiHeadlightsBold size={25} />,
            type: "item",
            permission: "light.create",
          },
          {
            id: "structures",
            title: "structures",
            path: "/admin/dashboard/cars/structures",
            icon: <MdOutlineDirectionsCar size={25} />,
            type: "item",
            permission: "structure.create",
          },
          {
            id: "feature",
            title: "features",
            type: "item",
            path: "/admin/dashboard/cars/features",
            icon: <GiCarSeat size={25} />,
            permission: "feature.view",
          },
        ],
      },
    ],
  },

  {
    id: "survey-questions",
    title: "fin_man",
    type: "group",
    children: [
      {
        id: "packages",
        title: "packages",
        type: "item",
        path: "/admin/dashboard/packages",
        icon: <MdOutlinePayments size={25} />,
        permission: "services.view",
      },
      {
        id: "subscription-management",
        type: "coollabse",
        title: "sub_man",
        children: [
          {
            id: "all-subscriptions",
            title: "all_sub",
            path: "/admin/dashboard/subscriptions",
            icon: <MdOutlinePayments size={25} />,
            type: "item",
            permission: "orders.create",
          },
          {
            id: "create-subscriptions",
            title: "create_sub",
            path: "/admin/dashboard/subscriptions/create",
            icon: <FaCirclePlus size={25} />,
            type: "item",
            permission: "orders.create",
          },
        ],
      },
    ],
  },
  {
    id: "brands-models",
    title: "brands",
    type: "group",
    children: [
      {
        id: "brand-management",
        type: "coollabse",
        title: "brand_man",
        children: [
          {
            id: "brand",
            title: "brand",
            path: "/admin/dashboard/brands",
            icon: <IoLogoModelS size={25} />,
            type: "item",
            permission: "brands.view",
          },
          {
            id: "brand-create",
            title: "brand_create",
            path: "/admin/dashboard/brands/create",
            icon: <FaCirclePlus size={25} />,
            type: "item",
            permission: "orders.create",
          },
        ],
      },
      {
        id: "model-management",
        type: "coollabse",
        title: "model_man",
        children: [
          {
            id: "model",
            title: "model",
            path: "/admin/dashboard/models",
            icon: <IoLogoModelS size={25} />,
            type: "item",
            permission: "models.view",
          },
          {
            id: "model-create",
            title: "model_create",
            path: "/admin/dashboard/models/create",
            icon: <FaCirclePlus size={25} />,
            type: "item",
            permission: "models.create",
          },
        ],
      },
    ],
  },
  {
    id: "banner",
    title: "banner",
    type: "group",
    children: [
      {
        id: "all-banners",
        title: "banners",
        type: "item",
        icon: <PiFlagBannerFold size={30} />,
        path: "/admin/dashboard/banners",
        permission: "banners.view",
      },
    ],
  },
  {
    title: "public",
    type: "group",
    children: [
      {
        id: "faq",
        path: "/admin/dashboard/faqs",
        title: "faq",
        type: "item",
        icon: <FcFaq size={30} />,
        external: false,
        permission: "FAQ.view",
      },
      {
        id: "privacy-ploicy",
        path: "/admin/dashboard/privacy",
        title: "privacy",
        type: "item",
        icon: <FcPrivacy size={30} />,
        external: false,
        permission: "legal_document.view",
      },
      {
        id: "terms",
        path: "/admin/dashboard/terms-and-conditions",
        title: "terms",
        type: "item",
        icon: <FcRules size={30} />,
        external: false,
        permission: "legal_document.view",
      },
    ],
  },
];
