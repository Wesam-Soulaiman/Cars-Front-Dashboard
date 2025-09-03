import { Stack } from "@mui/material";
import UpdateModel from "../pages/admin/BrandsModels/components/UpdateModel";
import useGetTranslation from "../utils/useGetTranslation";
import { useTranslation } from "react-i18next";
import DeleteModel from "../pages/admin/BrandsModels/components/DeleteModel";
import Permission from "../components/Permission";

export const ModelColumns = (brands = []) => {
  const { getTranslation2 } = useGetTranslation();
  const { t } = useTranslation();

  const col = [
    {
      accessorKey: "id",
      header: t("table.id"),
      enableColumnFilter: false,
      enableGlobalFilter: false,
    },
    {
      accessorKey: "name",
      header: t("table.name"),
      enableColumnFilter: false,
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
      accessorKey: "brand_name",
      header: t("table.brand"),
      enableColumnFilter: true,
      enableGlobalFilter: false,
      filterVariant: "select",
      filterSelectOptions: [
        { label: t("filter.all"), value: "" },
        ...brands.map((brand) => ({
          label: getTranslation2(brand, "name"),
          value: brand.id,
        })),
      ],
      Cell: ({ row }) => {
        const brand = getTranslation2(row.original, "brand_name");
        return <span>{brand}</span>;
      },
    },
    {
      accessorKey: "actions",
      header: t("table.actions"),
      enableColumnFilter: false,
      enableGlobalFilter: false,
      Cell: ({ row }) => (
        <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
          <Permission permission="models.update">
            <UpdateModel model={row.original} />
          </Permission>
          <Permission permission="models.delete">
            <DeleteModel model={row.original} />
          </Permission>
        </Stack>
      ),
    },
  ];

  return col;
};
