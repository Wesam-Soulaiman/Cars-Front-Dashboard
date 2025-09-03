import { Box, Grid, IconButton } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { PiCarProfileBold } from "react-icons/pi";
import { useTranslation } from "react-i18next";
import Loadable from "../../../../../components/Loadable";
import { useGetCars } from "../../../../../api/cars";
import { gridSpacing } from "../../../../../config";
import { CarsTableColumns } from "../../../../../tables-def/cars";
import TitleTypography from "../../../../../components/TitleTypography";
import { lazy, useState } from "react";

const Table = Loadable(lazy(() => import("../../../../../components/Table")));

const ShowroomCars = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [globalFilter, setGlobalFilter] = useState("");

  const users = useGetCars({
    page: pagination.pageIndex,
    pageSize: pagination.pageSize,
    name: globalFilter,
    storeId: id,
  });

  const data = users?.data?.data?.data || [];
  const total = users?.data?.data?.pagination?.total_page || 0;

  return (
    <Box>
      <Grid container spacing={gridSpacing}>
        <TitleTypography>{t("showroomProfile.cars")}</TitleTypography>

        <Grid size={12}>
          <Table
            exportFields={["id", "name"]}
            columns={CarsTableColumns()}
            data={data}
            manualPagination
            enableFullScreenToggle
            manualFiltering
            enableGlobalFilter
            enableTopToolbar
            enablePagination
            rowCount={total}
            state={{
              isLoading: users.isLoading,
              pagination,
              globalFilter,
            }}
            onPaginationChange={setPagination}
            onGlobalFilterChange={setGlobalFilter}
            renderRowActions={({ row }) => (
              <Box display="flex">
                <IconButton
                  color="info"
                  component={Link}
                  to={`/admin/dashboard/cars/${row.original.id}`}
                >
                  <PiCarProfileBold />
                </IconButton>
              </Box>
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShowroomCars;
