import { lazy, useMemo, useState } from "react";
import { Box, Button, Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import { gridSpacing } from "../../../config";
import Loadable from "../../../components/Loadable";
import { useGetBrands } from "./../../../api/brands/index";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Permission from "../../../components/Permission";
import { useGetCarParts } from "../../../api/carParts";
import { useGetModels } from "../../../api/models";
import { CarPartsColumns } from "../../../tables-def/carParts";
import { useGetCarPartCategories } from "../../../api/carPartsCategories";

const TableComponent = Loadable(
  lazy(() => import("../../../components/Table"))
);

const CarParts = () => {
  const { t } = useTranslation();

  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  // extract selected filter values
  const brand_id = columnFilters.find((f) => f.id === "brand_id")?.value || "";
  const model_id = columnFilters.find((f) => f.id === "model_id")?.value || "";
  const category_id =
    columnFilters.find((f) => f.id === "category_id")?.value || "";

  const carParts = useGetCarParts({
    page: pagination.pageIndex,
    pageSize: pagination.pageSize,
    brand_id,
    model_id,
    category_id,
  });

  const brands = useGetBrands({ page: 0, pageSize: 100 });
  const models = useGetModels({ page: 0, pageSize: 100 });
  const categories = useGetCarPartCategories({
    page: 0,
    pageSize: 100,
  });

  const brandsData = brands?.data?.data?.data || [];
  const modelsData = models?.data?.data?.data || [];
  const categoriesData = categories?.data?.data?.data || [];

  const data = carParts?.data?.data?.data || [];
  const total = carParts?.data?.data?.pagination?.total || 0;

  const exportFields = useMemo(() => ["id", "name"], []);

  return (
    <Permission permission="car_part.view">
      <Box>
        <Grid container spacing={gridSpacing}>
          <Permission permission="car_part.create">
            <Grid size={12}>
              <Button
                variant="contained"
                component={Link}
                to="/admin/dashboard/cars/parts/create"
              >
                {t("forms.create", { types: t("types.carParts") })}
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
              columns={CarPartsColumns(brandsData, modelsData, categoriesData)}
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

export default CarParts;
