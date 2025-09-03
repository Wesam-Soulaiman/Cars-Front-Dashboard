import useGetTranslation from "../utils/useGetTranslation";
import { useTranslation } from "react-i18next";

export const ShowroomsTableColumns = () => {
  const { getTranslation2 } = useGetTranslation();
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
      accessorKey: "count_products",
      header: t("table.carsNumber"),
      size: 50,
      enableSorting: true,
      enableGlobalFilter: false,
    },
    {
      accessorKey: "address",
      header: t("table.address"),
      enableSorting: false,
      enableGlobalFilter: true,
      Cell: ({ row, table }) => {
        const address = getTranslation2(row.original, "address");
        const filter = table.getState().globalFilter;
        if (!filter) return <span>{address}</span>;
        const regex = new RegExp(`(${filter})`, "ig");
        const parts = address.split(regex);
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
      accessorKey: "phone",
      header: t("table.phone"),
      maxSize: 150,
      enableSorting: false,
      enableGlobalFilter: false,
    },
    {
      accessorKey: "whatsapp_phone",
      header: t("table.whatsapp_phone"),
      maxSize: 150,
      enableSorting: false,
      enableGlobalFilter: false,
    },
    {
      accessorKey: "email",
      header: t("table.email"),
      maxSize: 250,
      enableSorting: false,
      enableGlobalFilter: false,
    },
  ];

  return col;
};
