import { Stack } from "@mui/material";
import useGetTranslation from "../utils/useGetTranslation";
import { useTranslation } from "react-i18next";
import Permission from "../components/Permission";
import UpdateGears from "./../pages/admin/Gears/components/UpdateGears";
import DeleteGears from "./../pages/admin/Gears/components/DeleteGears";

export const GearsColumns = () => {
  const { getTranslation2 } = useGetTranslation();
  const { t } = useTranslation();

  const col = [
    {
      accessorKey: "id",
      header: t("table.id"),
      enableGlobalFilter: false,
    },
    {
      accessorKey: "name",
      header: t("table.info"),
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
      accessorKey: "actions",
      header: t("table.actions"),
      enableGlobalFilter: false,
      Cell: ({ row }) => (
        <Stack flexDirection="row" alignItems="center" gap={1}>
          <Permission permission="gear.update">
            <UpdateGears gear={row.original} />
          </Permission>
          <Permission permission="gear.delete">
            <DeleteGears gear={row.original} />
          </Permission>
        </Stack>
      ),
    },
  ];

  return col;
};
