import { Box, Divider, Typography } from "@mui/material";
import { lazy, useMemo, useState } from "react";
import Grid from "@mui/material/Grid";
import { useTranslation } from "react-i18next";
import {
  useCreatePackages,
  useGetCategories,
  useGetPackages,
} from "./../../../api/packages/index";
import Loadable from "../../../components/Loadable";
import { PackagesColumns } from "../../../tables-def/packages";
import Permission from "../../../components/Permission";
import PackageForm from "./components/PackageForm";

const TableComponent = Loadable(
  lazy(() => import("../../../components/Table"))
);

const Packages = () => {
  const packages = useGetPackages();
  const createPackage = useCreatePackages();
  const categories = useGetCategories();
  const { t } = useTranslation();

  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const exportFields = useMemo(
    () => ["id", "name", "description", "category"],
    []
  );

  const categoriesData = categories?.data?.data.data || [];

  return (
    <Permission permission="services.view">
      <Box>
        <Permission permission="services.create">
          <Box sx={{ mb: 2 }}>
            <Typography variant="h3" mb={2}>
              {t("forms.create", { types: t("types.package") })}
            </Typography>
            <PackageForm
              initialValues={{
                name: "",
                name_ar: "",
                description: "",
                description_ar: "",
                category_service_id: null,
              }}
              onSubmit={(values, { resetForm }) => {
                createPackage.mutateAsync(values);
                resetForm();
              }}
              loadingButtonProps={{
                loading: createPackage.isPending,
              }}
            />
          </Box>

          <Grid size={12}>
            <Divider />
          </Grid>
        </Permission>
        <Grid size={12}>
          <TableComponent
            exportFields={exportFields}
            enableTopToolbar
            enableGlobalFilter
            enableColumnFilters
            enablePagination
            onPaginationChange={setPagination}
            onGlobalFilterChange={setGlobalFilter}
            enableFullScreenToggle
            data={packages?.data?.data?.data || []}
            columns={PackagesColumns(categoriesData)}
            state={{
              isLoading: packages.isLoading,
              globalFilter,
              pagination,
            }}
          />
        </Grid>
      </Box>
    </Permission>
  );
};

export default Packages;
