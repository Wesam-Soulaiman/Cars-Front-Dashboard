import { Stack } from "@mui/material";
import useGetTranslation from "../utils/useGetTranslation";
import { useTranslation } from "react-i18next";
import UpdateEmployee from "../pages/admin/employees/components/UpdateEmployee";
import DeleteEmployee from "../pages/admin/employees/components/DeleteEmployee";
import UpdatePassword from "../pages/admin/employees/components/UpdatePassword";
import Permission from "../components/Permission";

export const EmployeesTableColumns = (roles = []) => {
  const { getTranslation2 } = useGetTranslation();
  const { t } = useTranslation();

  const col = [
    {
      accessorKey: "id",
      header: t("table.id"),
      size: 50,
      enableSorting: false,
      enableColumnFilter: false,
      enableGlobalFilter: false,
    },
    {
      accessorKey: "name",
      header: t("table.name"),
      enableSorting: false,
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
      accessorKey: "role_name",
      header: t("table.role"),
      enableSorting: false,
      enableColumnFilter: true,
      enableGlobalFilter: false,
      filterVariant: "select",
      filterSelectOptions: [
        { label: t("filter.all"), value: "" },
        ...roles.map((role) => ({
          label: getTranslation2(role, "name"),
          value: role.id,
        })),
      ],
      Cell: ({ row }) => {
        const role = getTranslation2(row.original, "role_name");
        return <span>{role}</span>;
      },
    },
    {
      accessorKey: "phone",
      header: t("table.phone"),
      maxSize: 150,
      enableSorting: false,
      enableColumnFilter: false,
      enableGlobalFilter: false,
    },
    {
      accessorKey: "email",
      header: t("table.email"),
      maxSize: 250,
      enableSorting: false,
      enableColumnFilter: false,
      enableGlobalFilter: false,
    },
    {
      accessorKey: "actions",
      header: t("table.actions"),
      enableSorting: false,
      enableColumnFilter: false,
      enableGlobalFilter: false,
      Cell: ({ row }) => (
        <Stack flexDirection="row" alignItems="center" gap={1}>
          <Permission permission="employees.update">
            <UpdateEmployee employee={row.original} />
            <UpdatePassword employee={row.original} />
          </Permission>
          <Permission permission="employees.delete">
            <DeleteEmployee employee={row.original} />
          </Permission>
        </Stack>
      ),
    },
  ];

  return col;
};
