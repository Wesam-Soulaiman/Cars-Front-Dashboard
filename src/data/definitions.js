import { FaCar, FaTags } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";
import rent from "../assets/services/rent.png.webp";
import maintenance from "../assets/services/maintenance.png.webp";
import buy from "../assets/services/buy.png.webp";
import type1 from "../assets/BodyTypes/coupe.svg";
import type2 from "../assets/BodyTypes/sedan.svg";
import type3 from "../assets/BodyTypes/suv.svg";
import type4 from "../assets/BodyTypes/wagon.svg";
import type5 from "../assets/BodyTypes/pickup.svg";
import type6 from "../assets/BodyTypes/hatch.svg";
import type7 from "../assets/BodyTypes/minivan.svg";
import type8 from "../assets/BodyTypes/commercial.svg";
import type9 from "../assets/BodyTypes/other.svg";
const featuresData = [
  {
    title: "Diverse Inventory",
    description: "Extensive selection of vehicles for every need and budget",
    icon: FaCar,
  },
  {
    title: "Smart Search",
    description: "Intuitive tools for effortless browsing and comparison",
    icon: IoSearchSharp,
  },
  {
    title: "Best Value",
    description: "Competitive pricing and exclusive deals for maximum savings",
    icon: FaTags,
  },
  {
    title: "24/7 Support",
    description: "Dedicated assistance throughout your car-buying journey",
    icon: BiSupport,
  },
];
const ServicesData = [
  {
    imageSrc: buy,
    title: "Buying A Cars",
    description: " aliqua. Risus commodo viverra maecenas.",
    link: "#",
  },
  {
    imageSrc: maintenance,
    title: "Car Maintenance",
    description:
      "Consectetur adipiscing elit incididunt ut labore et dolore magna aliqua. Risus commodo viverra maecenas.",
    link: "#",
  },
  {
    imageSrc: rent,
    title: "Car Maintenance",
    description:
      "Consectetur adipiscing elit incididunt ut labore et dolore magna aliqua. Risus commodo viverra maecenas.",
    link: "#",
  },
];
const fuelType =
  [
    {
      value: "petrol",
      label: "بانزين",
    },
    {
      value: "diesel",
      label: "مازوت",
    },
    {
      value: "hybrid",
      label: "هايبرد",
    },
    {
      value: "electric",
      label: "كهرباء",
    },
  ];

const body_type = [
  {
    value: 1,
    label: "coupe",
    image: type1,
  },
  {
    value: 2,
    label: "sedan",
    image: type2,
  },
  {
    value: 3,
    label: "suv",
    image: type3,
  },
  {
    value: 4,
    label: "wagon",
    image: type4,
  },
  {
    value: 5,
    label: "pickup",
    image: type5,
  },
  {
    value: 6,
    label: "hatch",
    image: type6,
  },
  {
    value: 7,
    label: "minivan",
    image: type7,
  },
  {
    value: 8,
    label: "commercial",
    image: type8,
  },
  {
    value: 9,
    label: "other",
    image: type9,
  },
];
const statusOptions = [
  {
    value: "new",
    label: "New",
  }, {
    value: "used",
    label: "Used",
  }];

export { featuresData, statusOptions, ServicesData, fuelType, body_type };
