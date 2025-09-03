import { lazy, useEffect, useMemo, useState } from "react";
import { Box, Button, Divider, Grid, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useTranslation } from "react-i18next";
import Loadable from "../../../components/Loadable";
import { ShowroomsTableColumns } from "../../../tables-def/showrooms";
import { useGetShowrooms } from "../../../api/showrooms";
import { gridSpacing } from "../../../config";
import Permission from "../../../components/Permission";

const Table = Loadable(lazy(() => import("../../../components/Table")));

const AllShowrooms = () => {
  const { t } = useTranslation();

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);

  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearch(globalFilter);
    }, 500);
    return () => {
      clearTimeout(timerId);
    };
  }, [globalFilter]);

  const exportFields = useMemo(
    () => [
      "id",
      "name",
      "address",
      "count_products",
      "phone",
      "whatsapp_phone",
      "email",
    ],
    []
  );

  const showrooms = useGetShowrooms({
    page: pagination.pageIndex,
    pageSize: pagination.pageSize,
    name: debouncedSearch,
    sort_by: sorting[0]?.id,
    sort_order: sorting[0]?.desc ? "desc" : "asc",
  });

  const data = showrooms?.data?.data?.data || [];
  const total = showrooms?.data?.data?.pagination?.total || 0;

  return (
    <Permission permission="stores.view">
      <Box>
        <Grid container spacing={gridSpacing}>
          <Permission permission="stores.create">
            <Grid size={12}>
              <Button
                variant="contained"
                component={Link}
                to={"/admin/dashboard/showrooms/create"}
              >
                {t("forms.create", { types: t("types.showroom") })}
              </Button>
            </Grid>
            <Grid size={12}>
              <Divider />
            </Grid>
          </Permission>
          <Grid size={12}>
            <Table
              exportFields={exportFields}
              columns={ShowroomsTableColumns()}
              data={data}
              manualPagination
              enablePagination
              enableFullScreenToggle
              manualFiltering
              enableGlobalFilter
              enableTopToolbar
              rowCount={total}
              state={{
                isLoading: showrooms.isLoading,
                pagination,
                globalFilter,
                sorting,
              }}
              onPaginationChange={setPagination}
              onGlobalFilterChange={setGlobalFilter}
              enableSorting
              manualSorting
              onSortingChange={setSorting}
              renderRowActions={({ row }) => (
                <IconButton
                  color="info"
                  component={Link}
                  to={`${row.original.id}`}
                >
                  <CgProfile />
                </IconButton>
              )}
            />
          </Grid>
        </Grid>
      </Box>
    </Permission>
  );
};

export default AllShowrooms;
