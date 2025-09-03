import { lazy, useEffect, useMemo, useState } from "react";
import { Box, Button, Divider, Grid, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { PiCarProfileBold } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";

import { useTranslation } from "react-i18next";
import Loadable from "../../../components/Loadable";
import { gridSpacing } from "../../../config";
import { useGetCars } from "../../../api/cars";
import { CarsTableColumns } from "../../../tables-def/cars";

const Table = Loadable(lazy(() => import("../../../components/Table")));

const Cars = () => {
  const { t } = useTranslation();

  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearch(globalFilter);
    }, 500);
    return () => {
      clearTimeout(timerId);
    };
  }, [globalFilter]);

  const cars = useGetCars({
    page: pagination.pageIndex,
    pageSize: pagination.pageSize,
    name: debouncedSearch,
    sort_by: sorting[0]?.id,
    sort_order: sorting[0]?.desc ? "desc" : "asc",
  });

  const data = cars?.data?.data?.data || [];
  const total = cars?.data?.data?.pagination?.total_page || 0;

  const exportFields = useMemo(
    () => [
      "id",
      "name",
      "year_of_construction",
      "year_of_registration",
      "mileage",
      "price",
    ],
    []
  );

  return (
    <Box>
      <Grid container spacing={gridSpacing}>
        <Grid size={12}>
          <Button
            variant="contained"
            component={Link}
            to={"/admin/dashboard/cars/create"}
          >
            {t("forms.create", { types: t("types.car") })}
          </Button>
        </Grid>

        <Grid size={12}>
          <Divider />
        </Grid>

        <Grid size={12}>
          <Table
            exportFields={exportFields}
            columns={CarsTableColumns()}
            data={data}
            enableFullScreenToggle
            enableTopToolbar
            enablePagination
            manualPagination
            onPaginationChange={setPagination}
            manualFiltering
            enableGlobalFilter
            onGlobalFilterChange={setGlobalFilter}
            enableSorting
            manualSorting
            onSortingChange={setSorting}
            rowCount={total}
            state={{
              isLoading: cars.isLoading,
              pagination,
              globalFilter,
              sorting,
            }}
            renderRowActions={({ row }) => (
              <Box display="flex">
                <IconButton
                  color="info"
                  component={Link}
                  to={`/admin/dashboard/cars/${row.original.id}`}
                >
                  <PiCarProfileBold />
                </IconButton>
                <IconButton
                  color="info"
                  component={Link}
                  to={`/admin/dashboard/showrooms/${row.original.store_id}`}
                >
                  <CgProfile />
                </IconButton>
              </Box>
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Cars;
