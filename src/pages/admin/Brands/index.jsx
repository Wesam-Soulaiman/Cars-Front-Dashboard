import { lazy, useEffect, useMemo, useState } from "react";
import { Box, Button, Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import { gridSpacing } from "../../../config";
import Loadable from "../../../components/Loadable";
import { BrandColumns } from "../../../tables-def/brands";
import { useGetBrands } from "./../../../api/brands/index";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Permission from "../../../components/Permission";

const TableComponent = Loadable(
  lazy(() => import("../../../components/Table"))
);

const Brands = () => {
  const { t } = useTranslation();

  const [globalFilter, setGlobalFilter] = useState("");
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

  const brands = useGetBrands({
    page: pagination.pageIndex,
    pageSize: pagination.pageSize,
    name: debouncedSearch,
  });

  const exportFields = useMemo(() => ["id", "name"], []);
  const data = brands?.data?.data?.data || [];
  const total = brands?.data?.data?.pagination?.total || 0;
  return (
    <Permission permission="brands.view">
      <Box>
        <Grid container spacing={gridSpacing}>
          <Permission permission="brands.create">
            <Grid size={12}>
              <Button
                variant="contained"
                component={Link}
                to={"/admin/dashboard/brands/create"}
              >
                {t("forms.create", { types: t("types.brand") })}
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
              columns={BrandColumns()}
              state={{
                isLoading: brands.isLoading,
                globalFilter,
                pagination,
              }}
              enablePagination
              manualPagination
              onPaginationChange={setPagination}
              manualFiltering
              enableGlobalFilter
              onGlobalFilterChange={setGlobalFilter}
              enableTopToolbar
              rowCount={total}
              enableFullScreenToggle
            />
          </Grid>
        </Grid>
      </Box>
    </Permission>
  );
};

export default Brands;
