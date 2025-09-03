import { lazy, useEffect, useMemo, useState } from "react";
import { Box, Button, Divider } from "@mui/material";
import { gridSpacing } from "../../../config";
import Grid from "@mui/material/Grid";
import Loadable from "../../../components/Loadable";
import { ModelColumns } from "../../../tables-def/models";
import { useGetModels } from "./../../../api/models/index";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useGetBrands } from "../../../api/brands";
import Permission from "../../../components/Permission";

const TableComponent = Loadable(
  lazy(() => import("../../../components/Table"))
);

const BrandsModels = () => {
  const { t } = useTranslation();

  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState([]);
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

  const models = useGetModels({
    page: pagination.pageIndex,
    pageSize: pagination.pageSize,
    name: debouncedSearch,
    brand_id: columnFilters.find((f) => f.id === "brand_name")?.value,
  });

  const brands = useGetBrands({
    page: 0,
    pageSize: 100,
  });

  const exportFields = useMemo(() => ["id", "name", "brand_name"], []);

  const data = models?.data?.data?.data || [];
  const total = models?.data?.data?.pagination?.total || 0;
  const brandsData = brands?.data?.data.data || [];

  return (
    <Permission permission="models.view">
      <Box>
        <Grid container spacing={gridSpacing}>
          <Permission permission="models.create">
            <Grid size={12}>
              <Button
                variant="contained"
                component={Link}
                to={"/admin/dashboard/models/create"}
              >
                {t("forms.create", { types: t("types.model") })}
              </Button>
            </Grid>
            <Grid size={12}>
              <Divider />
            </Grid>
          </Permission>
          <Grid size={12}>
            <TableComponent
              exportFields={exportFields}
              data={data || []}
              enableFullScreenToggle
              enableTopToolbar
              enableGlobalFilter
              enableColumnFilters
              manualFiltering
              onGlobalFilterChange={setGlobalFilter}
              onColumnFiltersChange={setColumnFilters}
              enablePagination
              manualPagination
              onPaginationChange={setPagination}
              rowCount={total}
              columns={ModelColumns(brandsData)}
              state={{
                isLoading: models.isLoading,
                globalFilter,
                pagination,
                columnFilters,
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </Permission>
  );
};

export default BrandsModels;
