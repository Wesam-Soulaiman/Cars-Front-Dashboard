import useGetTranslation from "../utils/useGetTranslation";
import { useTranslation } from "react-i18next";
import { Stack } from "@mui/material";
import UpdateOffer from "../pages/admin/Offers/components/UpdateOffer";
import DeleteOffer from "../pages/admin/Offers/components/DeleteOffer";
import Permission from "../components/Permission";

export const OffersTableColumns = () => {
  const { getTranslation2 } = useGetTranslation();
  const { t } = useTranslation();

  const col = [
    {
      accessorKey: "id",
      header: t("table.id"),
      size: 50,
    },
    {
      accessorKey: "name",
      header: t("table.name"),
      Cell: ({ row }) => {
        const name = getTranslation2(row.original, "name");
        return <span>{name}</span>;
      },
    },
    {
      accessorKey: "store_name",
      header: t("table.showroom"),
      Cell: ({ row }) => {
        const name = getTranslation2(row.original, "store_name");
        return <span>{name}</span>;
      },
    },
    {
      accessorKey: "year_of_construction",
      header: t("table.year_of_construction"),
      maxSize: 50,
    },
    {
      accessorKey: "start_time",
      header: t("table.startDate"),
      maxSize: 150,
    },
    {
      accessorKey: "end_time",
      header: t("table.endDate"),
      maxSize: 150,
    },
    {
      accessorKey: "price",
      header: t("table.price"),
      maxSize: 150,
    },
    {
      accessorKey: "old_price",
      header: t("table.old_price"),
      maxSize: 150,
    },
    {
      accessorKey: "actions",
      header: t("table.actions"),
      Cell: ({ row }) => (
        <Stack flexDirection="row" alignItems="center" gap={1}>
          <Permission permission="offers.update">
            <UpdateOffer offer={row.original} />
          </Permission>
          <Permission permission="offers.delete">
            <DeleteOffer offer={row.original} />
          </Permission>
        </Stack>
      ),
    },
  ];

  return col;
};
