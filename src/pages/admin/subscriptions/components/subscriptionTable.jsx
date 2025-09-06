import { lazy, useEffect, useMemo, useState } from "react";
import Loadable from "../../../../components/Loadable";
import { useGetSubscription } from "../../../../api/subscriptions";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { SubscriptionsColumns } from "../../../../tables-def/subscriptions";
import { Box, Button, Divider, Grid, IconButton } from "@mui/material";
import { gridSpacing } from "../../../../config";
import { useTranslation } from "react-i18next";
import { useGetPackages } from "../../../../api/packages";
import Permission from "../../../../components/Permission";

const Table = Loadable(lazy(() => import("../../../../components/Table")));

const SubscriptionTable = () => {
  const { t } = useTranslation();

  const exportFields = useMemo(
    () => [
      "id",
      "service_name",
      "store_name",
      "price",
      "count_days",
      "start_time",
      "end_time",
      "is_active",
    ],
    []
  );

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

  const packages = useGetPackages();

  const subscriptions = useGetSubscription({
    page: pagination.pageIndex,
    pageSize: pagination.pageSize,
    name: debouncedSearch,
    service_id: columnFilters.find((f) => f.id === "service_name")?.value,
    active: columnFilters.find((f) => f.id === "active")?.value,
  });

  const data = subscriptions?.data?.data?.data.orders || [];
  const total = subscriptions?.data?.data?.pagination?.total || 0;
  const packagesData = packages?.data?.data.data || [];

  return (
    <Permission permission="orders.view">
      <Box>
        <Grid container spacing={gridSpacing}>
          <Permission permission="orders.create">
            <Grid size={12}>
              <Button
                variant="contained"
                component={Link}
                to={"/admin/dashboard/subscriptions/create"}
              >
                {t("forms.create", { types: t("types.subscription") })}
              </Button>
            </Grid>

            <Grid size={12}>
              <Divider />
            </Grid>
          </Permission>

          <Grid size={12}>
            <Table
              exportFields={exportFields}
              columns={SubscriptionsColumns(packagesData)}
              data={data}
              manualPagination
              enablePagination
              enableFullScreenToggle
              manualFiltering
              enableGlobalFilter
              enableTopToolbar
              enableColumnFilters
              rowCount={total}
              state={{
                isLoading: subscriptions.isLoading,
                pagination,
                globalFilter,
                columnFilters,
              }}
              onPaginationChange={setPagination}
              onGlobalFilterChange={setGlobalFilter}
              onColumnFiltersChange={setColumnFilters}
              renderRowActions={({ row }) => (
                <Permission permission="stores.view">
                  <IconButton
                    color="info"
                    component={Link}
                    to={`/admin/dashboard/showrooms/${row.original.store_id}`}
                  >
                    <CgProfile />
                  </IconButton>
                </Permission>
              )}
            />
          </Grid>
        </Grid>
      </Box>
    </Permission>
  );
};

export default SubscriptionTable;
