import { lazy, useState } from "react";
import { Box, Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import { gridSpacing } from "../../../config";
import Loadable from "../../../components/Loadable";
import { useGetRoles } from "../../../api/roles";
import { RolesColumns } from "../../../tables-def/roles";
import CreateRole from "./components/CreateRole";
import Permission from "../../../components/Permission";

const TableComponent = Loadable(
  lazy(() => import("../../../components/Table"))
);

const Roles = () => {
  const roles = useGetRoles();

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  return (
    <Permission permission="roles.view">
      <Box>
        <Grid container spacing={gridSpacing}>
          <Permission permission="roles.create">
            <Grid size={12}>
              <CreateRole />
            </Grid>
            <Grid size={12}>
              <Divider />
            </Grid>
          </Permission>
          <Grid size={12}>
            <TableComponent
              enableExport={false}
              data={roles?.data?.data?.data || []}
              columns={RolesColumns()}
              state={{
                isLoading: roles.isLoading,
                pagination,
              }}
              enablePagination
              onPaginationChange={setPagination}
            />
          </Grid>
        </Grid>
      </Box>
    </Permission>
  );
};

export default Roles;
