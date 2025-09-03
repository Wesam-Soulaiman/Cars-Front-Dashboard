import { Stack } from "@mui/material";
import useGetTranslation from "../utils/useGetTranslation";
import { useTranslation } from "react-i18next";
import UpdatePackage from "../pages/admin/packages/components/UpdatePackage";
import DeletePackage from "../pages/admin/packages/components/DeletePackage";
import Permission from "../components/Permission";

export const PackagesColumns = (categories = []) => {
  const { getTranslation } = useGetTranslation();
  const { t } = useTranslation();

  const col = [
    {
      accessorKey: "id",
      header: t("table.id"),
      enableColumnFilter: false,
      enableGlobalFilter: false,
    },
    {
      accessorKey: `${getTranslation("name")}`,
      header: t("table.name"),
      enableColumnFilter: false,
      enableGlobalFilter: true,
    },
    {
      accessorKey: `${getTranslation("description")}`,
      header: t("table.description"),
      enableColumnFilter: false,
      enableGlobalFilter: true,
    },
    {
      accessorKey: "category",
      header: t("table.category"),
      enableColumnFilter: true,
      enableGlobalFilter: false,
      filterVariant: "select",

      filterSelectOptions: [
        { label: t("filter.all"), value: "" },
        ...categories.map((category) => ({
          label: t("category." + category.name),
          value: category.name,
        })),
      ],
      Cell: ({ row }) => {
        const category = row.original.category;
        return <span>{t("category." + category)}</span>;
      },
    },
    {
      accessorKey: "actions",
      header: t("table.actions"),
      enableColumnFilter: false,
      enableGlobalFilter: false,
      Cell: ({ row }) => (
        <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
          <Permission permission="services.update">
            <UpdatePackage packages={row.original} />
          </Permission>
          <Permission permission="services.delete">
            <DeletePackage packages={row.original} />
          </Permission>
        </Stack>
      ),
    },
  ];

  return col;
};
