import useGetTranslation from "../utils/useGetTranslation";
import { useTranslation } from "react-i18next";
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";
import useGetLabel from "../utils/useGetLabel";
import { fuelData } from "../data/fuelData";
import { typeData } from "../data/typeData";
import { gearsTypesData } from "../data/gearsTypesData";

export const CarsTableColumns = (brands = [], models = []) => {
  const { getTranslation2 } = useGetTranslation();
  const { getDataLabel } = useGetLabel();
  const { t } = useTranslation();

  const col = [
    {
      accessorKey: "id",
      header: t("table.id"),
      size: 50,
      enableSorting: false,
      enableGlobalFilter: false,
    },
    {
      accessorKey: "name",
      header: t("table.name"),
      enableSorting: false,
      enableGlobalFilter: true,
      Cell: ({ row, table }) => {
        const name = getTranslation2(row.original, "name");
        const filter = table.getState().globalFilter;
        if (!filter) return <span>{name}</span>;
        const regex = new RegExp(`(${filter})`, "ig");
        const parts = name.split(regex);
        return (
          <span>
            {parts.map((part, index) =>
              part.toLowerCase() === filter.toLowerCase() ? (
                <span
                  key={index}
                  style={{ backgroundColor: "yellow", color: "black" }}
                >
                  {part}
                </span>
              ) : (
                <span key={index}>{part}</span>
              )
            )}
          </span>
        );
      },
    },
    {
      accessorKey: "fuel_type",
      header: t("table.fuel_type"),
      enableSorting: false,
      enableGlobalFilter: false,
      Cell: ({ row }) => {
        return <span>{getDataLabel(fuelData, row.original.type)}</span>;
      },
    },
    {
      accessorKey: "gears_type",
      header: t("table.gears"),
      enableSorting: false,
      enableGlobalFilter: false,
      Cell: ({ row }) => {
        return <span>{getDataLabel(gearsTypesData, row.original.gears)}</span>;
      },
    },
    {
      accessorKey: "year_of_construction",
      header: t("table.year_of_construction"),
      enableSorting: true,
      enableGlobalFilter: false,
      maxSize: 50,
    },
    {
      accessorKey: "year_of_registration",
      header: t("table.year_of_registration"),
      enableSorting: true,
      enableGlobalFilter: false,
      maxSize: 50,
    },
    {
      accessorKey: "mileage",
      header: t("table.mileage"),
      enableSorting: true,
      enableGlobalFilter: false,
      maxSize: 50,
    },
    {
      accessorKey: "type",
      header: t("table.status"),
      enableSorting: false,
      enableGlobalFilter: false,
      maxSize: 50,
      Cell: ({ row }) => {
        return <span>{getDataLabel(typeData, row.original.type)}</span>;
      },
    },
    {
      accessorKey: "price",
      header: t("table.price"),
      enableSorting: true,
      enableGlobalFilter: false,
      maxSize: 150,
    },
    {
      accessorKey: "offer",
      header: t("table.offer"),
      enableSorting: false,
      enableGlobalFilter: false,
      maxSize: 50,

      Cell: ({ row }) => {
        return (
          <div>
            {row.original.type === true ? (
              <FaCheck color="green" size={15} />
            ) : (
              <ImCross color="red" size={15} />
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "old_price",
      header: t("table.old_price"),
      enableSorting: false,
      enableGlobalFilter: false,
      maxSize: 50,
    },
  ];

  return col;
};
