import { Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import useGetTranslation from "../utils/useGetTranslation";
import UpdatePriceButton from "../pages/admin/packages/components/UpdatePriceButton";
import DeletePriceButton from "../pages/admin/packages/components/DeletePriceButton";

export const PricingColumns = () => {
  const { getTranslation2 } = useGetTranslation();
  const { t } = useTranslation();

  let pricingColumns = [
    {
      accessorKey: "title",
      header: t("table.title"),
      Cell: ({ row }) => {
        return <span>{getTranslation2(row.original, "title")}</span>;
      },
    },
    {
      accessorKey: "price",
      header: t("table.price"),
      Cell: ({ cell }) => `SAR${cell.getValue().toFixed(2)}`,
    },
    {
      accessorKey: "number_of_days",
      header: t("table.numberOfDays"),
    },
    {
      id: "actions",
      header: t("table.actions"),
      Cell: ({ row }) => (
        <Stack flexDirection={"row"} gap={1}>
          <UpdatePriceButton price={row.original} />
          <DeletePriceButton price={row.original} />
        </Stack>
      ),
    },
  ];

  return pricingColumns;
};
