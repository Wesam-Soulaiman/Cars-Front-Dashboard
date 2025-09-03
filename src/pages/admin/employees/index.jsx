import { lazy, useEffect, useMemo, useState } from "react";
import { Box, Button, Divider, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Loadable from "../../../components/Loadable";
import { gridSpacing } from "../../../config";
import { useGetEmployees } from "../../../api/employees";
import { EmployeesTableColumns } from "../../../tables-def/employees";
import { useGetRoles } from "../../../api/roles";
import Permission from "../../../components/Permission";

const Table = Loadable(lazy(() => import("../../../components/Table")));

const AllEmployees = () => {
  const { t } = useTranslation();

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState([]);

  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearch(globalFilter);
    }, 500);
    return () => {
      clearTimeout(timerId);
    };
  }, [globalFilter]);

  const roles = useGetRoles();

  const employees = useGetEmployees({
    page: pagination.pageIndex,
    pageSize: pagination.pageSize,
    name: debouncedSearch,
    role_id: columnFilters.find((f) => f.id === "role_name")?.value,
  });

  const exportFields = useMemo(
    () => ["id", "name", "role_name", "phone", "email"],
    []
  );

  const data = employees?.data?.data?.data || [];
  const total = employees?.data?.data?.pagination?.total || 0;
  const rolesData = roles?.data?.data.data || [];

  return (
    <Permission permission="employees.view">
      <Box>
        <Grid container spacing={gridSpacing}>
          <Permission permission="employees.create">
            <Grid size={12}>
              <Button
                variant="contained"
                component={Link}
                to={"/admin/dashboard/employees/create"}
              >
                {t("forms.create", { types: t("types.employee") })}
              </Button>
            </Grid>
            <Grid size={12}>
              <Divider />
            </Grid>
          </Permission>
          <Grid size={12}>
            <Table
              exportFields={exportFields}
              columns={EmployeesTableColumns(rolesData)}
              data={data}
              enablePagination
              manualPagination
              enableFullScreenToggle
              enableColumnFilters
              manualFiltering
              enableGlobalFilter
              enableTopToolbar
              rowCount={total}
              state={{
                isLoading: employees.isLoading,
                pagination,
                globalFilter,
                columnFilters,
              }}
              onPaginationChange={setPagination}
              onGlobalFilterChange={setGlobalFilter}
              onColumnFiltersChange={setColumnFilters}
            />
          </Grid>
        </Grid>
      </Box>
    </Permission>
  );
};

export default AllEmployees;
