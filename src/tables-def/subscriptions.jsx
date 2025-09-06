import { Chip, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import useGetTranslation from "../utils/useGetTranslation";
import UpdateSub from "../pages/admin/subscriptions/components/UpdateSub";
import DeleteSub from "../pages/admin/subscriptions/components/DeleteSub";
import RenewalSub from "../pages/admin/subscriptions/components/RenewalSub";
import ActivationSub from "../pages/admin/subscriptions/components/ActivationSub";
import Permission from "../components/Permission";

export const SubscriptionsColumns = (packages = []) => {
  const { t } = useTranslation();
  const { getTranslation2 } = useGetTranslation();

  const col = [
    {
      accessorKey: "id",
      header: t("table.id"),
      size: 50,
      enableColumnFilter: false,
      enableGlobalFilter: false,
    },
    {
      accessorKey: "store_name",
      header: t("table.showroom"),
      enableColumnFilter: false,
      enableGlobalFilter: true,

      Cell: ({ row, table }) => {
        const name = getTranslation2(row.original, "store_name");
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
      accessorKey: "service_name",
      header: t("table.package"),
      enableColumnFilter: true,
      enableGlobalFilter: false,
      filterVariant: "select",
      filterSelectOptions: [
        { label: t("filter.all"), value: "" },
        ...packages.map((service) => ({
          label: getTranslation2(service, "name"),
          value: service.id,
        })),
      ],
      Cell: ({ row }) => {
        const service = getTranslation2(row.original, "service_name");
        return <span>{service}</span>;
      },
    },
    {
      accessorKey: "price",
      header: t("table.price"),
      maxSize: 150,
      enableSorting: true,
      enableColumnFilter: false,
      enableGlobalFilter: false,
    },
    {
      accessorKey: "start_time",
      header: t("table.startDate"),
      maxSize: 150,
      enableColumnFilter: false,
      enableGlobalFilter: false,
    },
    {
      accessorKey: "end_time",
      header: t("table.endDate"),
      maxSize: 150,
      enableColumnFilter: false,
      enableGlobalFilter: false,
    },
    {
      accessorKey: "day_left",
      header: t("table.days_left"),
      maxSize: 150,
      enableSorting: true,
      enableColumnFilter: false,
      enableGlobalFilter: false,
    },
    {
      accessorKey: "active",
      header: t("table.status"),
      enableColumnFilter: true,
      enableGlobalFilter: false,
      filterVariant: "select",
      filterSelectOptions: [
        { label: t("table.active"), value: "1" },
        { label: t("table.notActive"), value: "0" },
      ],
      Cell: ({ cell }) => (
        <Chip
          sx={{
            width: "100px",
          }}
          color={cell.getValue() ? "secondary" : "warning"}
          label={cell.getValue() ? t("table.active") : t("table.notActive")}
        />
      ),
    },
    {
      accessorKey: "actions",
      header: t("table.actions"),
      enableColumnFilter: false,
      Cell: ({ row }) => (
        <Stack flexDirection="row" alignItems="center" gap={1}>
          <Permission permission="orders.update">
            {row.original.day_left <= 0 && <RenewalSub sub={row.original} />}
            <UpdateSub sub={row.original} />
            <ActivationSub sub={row.original} />
          </Permission>
          <Permission permission="orders.delete">
            <DeleteSub sub={row.original} />
          </Permission>
        </Stack>
      ),
    },
  ];

  return col;
};
