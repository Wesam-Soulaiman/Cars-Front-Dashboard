import { Box } from "@mui/material";
import { lazy, useEffect, useMemo, useState } from "react";
import Grid from "@mui/material/Grid";
import Loadable from "../../../components/Loadable";
import Permission from "../../../components/Permission";
import { useGetCarPartCategories } from "../../../api/carPartsCategories";
import CreateCarPartCategories from "./components/CreateCarPartCategories";
import { CarPartCategoriesColumns } from "../../../tables-def/carPartCategories";

const TableComponent = Loadable(
  lazy(() => import("../../../components/Table"))
);

const CarPartCategories = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearch(globalFilter);
    }, 500);
    return () => {
      clearTimeout(timerId);
    };
  }, [globalFilter]);

  const carPartCategories = useGetCarPartCategories({
    page: pagination.pageIndex,
    pageSize: pagination.pageSize,
    name: debouncedSearch,
  });
  const exportFields = useMemo(() => ["id", "name"], []);
  const total = carPartCategories?.data?.data?.pagination?.total || 0;

  return (
    <Permission permission="car_part_categories.view">
      <Box>
        <CreateCarPartCategories />
        <Grid size={12}>
          <TableComponent
            exportFields={exportFields}
            enableTopToolbar
            manualPagination
            enablePagination
            onPaginationChange={setPagination}
            enableFullScreenToggle
            data={carPartCategories?.data?.data?.data || []}
            columns={CarPartCategoriesColumns()}
            manualFiltering
            enableGlobalFilter
            onGlobalFilterChange={setGlobalFilter}
            rowCount={total}
            state={{
              isLoading: carPartCategories.isLoading,
              globalFilter,
              pagination,
            }}
          />
        </Grid>
      </Box>
    </Permission>
  );
};

export default CarPartCategories;
