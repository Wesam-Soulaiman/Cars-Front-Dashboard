import { Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import Permission from "../components/Permission";
import useGetTranslation from "../utils/useGetTranslation";
import UpdateCarParts from "../pages/admin/CarParts/components/UpdateCarParts";
import DeleteCarParts from "../pages/admin/CarParts/components/DeleteCarParts";
// import UpdateCarPart, DeleteCarPart from your components

export const CarPartsColumns = (brands = [], models = [], categories = []) => {
  const { getTranslation2 } = useGetTranslation();
  const { t } = useTranslation();

  return [
    {
      accessorKey: "id",
      header: t("table.id"),
      enableColumnFilter: false,
      enableGlobalFilter: false,
    },
    {
      accessorKey: "brand_id",
      header: t("table.brand"),
      filterVariant: "select",
      filterSelectOptions: [
        { label: t("filter.all"), value: "" },
        ...brands.map((b) => ({
          label: getTranslation2(b, "name"),
          value: b.id,
        })),
      ],
      Cell: ({ row }) => {
        const brand = brands.find((b) => b.id === row.original.brand.id);
        return brand ? getTranslation2(brand, "name") : "-";
      },
    },
    {
      accessorKey: "model_id",
      header: t("table.model"),
      filterVariant: "select",
      filterSelectOptions: [
        { label: t("filter.all"), value: "" },
        ...models.map((m) => ({
          label: getTranslation2(m, "name"),
          value: m.id,
        })),
      ],
      Cell: ({ row }) => {
        const model = models.find((m) => m.id === row.original.model.id);
        return model ? getTranslation2(model, "name") : "-";
      },
    },
    {
      accessorKey: "category_id",
      header: t("table.category"),
      filterVariant: "select",
      filterSelectOptions: [
        { label: t("filter.all"), value: "" },
        ...categories.map((c) => ({
          label: getTranslation2(c, "name"),
          value: c.id,
        })),
      ],
      Cell: ({ row }) => {
        const category = categories.find(
          (c) => c.id === row.original.category.id
        );
        return category ? getTranslation2(category, "name") : "-";
      },
    },
    {
      accessorKey: "actions",
      header: t("table.actions"),
      enableGlobalFilter: false,
      enableColumnFilter: false,
      Cell: ({ row }) => (
        <Stack flexDirection="row" alignItems="center" gap={1}>
          <Permission permission="car_part.update">
            <UpdateCarParts carParts={row.original} />
          </Permission>
          <Permission permission="car_part.delete">
            <DeleteCarParts carParts={row.original} />
          </Permission>
        </Stack>
      ),
    },
  ];
};
