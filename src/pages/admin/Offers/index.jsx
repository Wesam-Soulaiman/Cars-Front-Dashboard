import { lazy, useMemo, useState } from "react";
import { Box, Button, Divider, Grid, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { PiCarProfileBold } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";

import { useTranslation } from "react-i18next";
import Loadable from "../../../components/Loadable";
import { useGetOffers } from "../../../api/offer";
import { gridSpacing } from "../../../config";
import { OffersTableColumns } from "../../../tables-def/offers";
import Permission from "../../../components/Permission";

const Table = Loadable(lazy(() => import("../../../components/Table")));

const Offers = () => {
  const { t } = useTranslation();

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const users = useGetOffers({
    page: pagination.pageIndex,
    pageSize: pagination.pageSize,
  });

  const data = users?.data?.data?.data || [];
  const total = users?.data?.data?.pagination?.total || 0;

  const exportFields = useMemo(
    () => [
      "id",
      "name",
      "store_name",
      "start_time",
      "end_time",
      "price",
      "old_price",
    ],
    []
  );

  return (
    <Permission permission="offers.view">
      <Box>
        <Grid container spacing={gridSpacing}>
          <Permission permission="offers.create">
            <Grid size={12}>
              <Button
                variant="contained"
                component={Link}
                to={"/admin/dashboard/cars/offers/create"}
              >
                {t("forms.create", { types: t("types.offer") })}
              </Button>
            </Grid>

            <Grid size={12}>
              <Divider />
            </Grid>
          </Permission>

          <Grid size={12}>
            <Table
              exportFields={exportFields}
              columns={OffersTableColumns()}
              data={data}
              manualPagination
              enableGlobalFilter={false}
              enableFullScreenToggle
              enablePagination
              enableTopToolbar
              rowCount={total}
              state={{
                isLoading: users.isLoading,
                pagination,
              }}
              onPaginationChange={setPagination}
              renderRowActions={({ row }) => (
                <Box display="flex">
                  <IconButton
                    color="info"
                    component={Link}
                    to={`/admin/dashboard/cars/${row.original.productId}`}
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
    </Permission>
  );
};

export default Offers;
