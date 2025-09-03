import { IconButton, Stack } from "@mui/material";
import useGetTranslation from "../utils/useGetTranslation";
import { useTranslation } from "react-i18next";
import DeleteRole from "../pages/admin/roles/components/DeleteBrand";
import UpdateRole from "../pages/admin/roles/components/UpdateRole";
import { Link } from "react-router-dom";
import { BiTask } from "react-icons/bi";
import Permission from "../components/Permission";

export const RolesColumns = () => {
  const { getTranslation2 } = useGetTranslation();
  const { t } = useTranslation();

  const col = [
    {
      accessorKey: "id",
      header: t("table.id"),
    },
    {
      accessorKey: "name",
      header: t("table.name"),
      Cell: ({ row }) => {
        return <span>{getTranslation2(row.original, "name")}</span>;
      },
    },

    {
      accessorKey: "actions",
      header: t("table.actions"),
      Cell: ({ row }) => (
        <Stack flexDirection="row" alignItems="center" gap={1}>
          <Permission permission="roles.update">
            <UpdateRole role={row.original} />
            <IconButton
              color="success"
              component={Link}
              to={`/admin/dashboard/roles/${row.original.id}`}
            >
              <BiTask />
            </IconButton>
          </Permission>
          <Permission permission="roles.delete">
            <DeleteRole role={row.original} />
          </Permission>
        </Stack>
      ),
    },
  ];

  return col;
};
