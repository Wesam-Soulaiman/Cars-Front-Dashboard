import { Grid, Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import {
  ShoppingCart,
  Store,
  MonetizationOn,
  LocalOffer,
  People,
  AssignmentTurnedIn,
} from "@mui/icons-material";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import { useTranslation } from "react-i18next";
import { useGetStatistics } from "../../../api/statistics";
import { gridSpacing } from "../../../config";
import StatisticCard from "./components/StatisticCard";
import LoadingDataError from "../../../components/LoadingDataError";
import SubscriptionChart from "./components/charts/SubscriptionChart";
import StoresChart from "./components/charts/StoresChart";
import CarsChart from "./components/charts/CarsChart";
import RolesPie from "./components/charts/RolesPie";
import ServicesPie from "./components/charts/ServicesPie";
import TitleTypography from "../../../components/TitleTypography";
import Permission from "../../../components/Permission";
import Role from "../../../components/Role";

const Home = () => {
  const { data, isLoading, isError, refetch } = useGetStatistics();
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (isError) {
    return <LoadingDataError refetch={refetch} />;
  }

  if (isLoading) {
    return <Typography>{t("global.loading")}...</Typography>;
  }

  const homeData = data?.data?.data;

  // Prepare chart data
  const prepareMonthlyData = (apiData, key) => {
    return (
      apiData?.map((item) => ({
        y: item[key],
        x: item.month,
      })) || []
    );
  };

  const ordersData = prepareMonthlyData(homeData.monthlyOrders, "order_count");
  const storesData = prepareMonthlyData(homeData.monthlyStores, "store_count");
  const productsData = prepareMonthlyData(
    homeData.monthlyProduct,
    "store_count"
  );

  return (
    <Permission permission="dashboard.access">
      <Box sx={{ p: isMobile ? 1 : 3 }}>
        <TitleTypography
          variant="h4"
          gutterBottom
          sx={{ mb: 3, fontWeight: 600 }}
        >
          {t("dashboard.overview")}
        </TitleTypography>

        {/* Top Stats Cards - First Row */}
        <Role role={"employee"}>
          <Grid container spacing={gridSpacing} sx={{ mb: 2 }}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <StatisticCard
                title={t("dashboard.total_revenue")}
                count={`${homeData.totalBills || 0} $`}
                icon={<MonetizationOn fontSize="large" color="warning" />}
                loading={isLoading}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <StatisticCard
                title={t("dashboard.total_cars")}
                count={homeData.countProduct || 0}
                icon={<TimeToLeaveIcon fontSize="large" color="primary" />}
                loading={isLoading}
                subTitle={`${homeData.countActiveProduct || 0} ${t(
                  "dashboard.active"
                )}`}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <StatisticCard
                title={t("dashboard.total_stores")}
                count={homeData.countStore || 0}
                icon={<Store fontSize="large" color="success" />}
                loading={isLoading}
                subTitle={`${homeData.countActiveStore || 0} ${t(
                  "dashboard.active"
                )}`}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <StatisticCard
                title={t("dashboard.total_subscription")}
                count={homeData.CountOrder || 0}
                icon={<ShoppingCart fontSize="large" color="secondary" />}
                loading={isLoading}
                subTitle={`${homeData.CountActiveOrder || 0} ${t(
                  "dashboard.active"
                )}`}
              />
            </Grid>
          </Grid>

          {/* Top Stats Cards - Second Row */}
          <Grid container spacing={gridSpacing} sx={{ mb: 4 }}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <StatisticCard
                title={t("dashboard.total_offers")}
                count={homeData.countOffer || 0}
                icon={<LocalOffer fontSize="large" color="error" />}
                loading={isLoading}
                subTitle={`${homeData.CountActiveOffer || 0} ${t(
                  "dashboard.active"
                )}`}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <StatisticCard
                title={t("dashboard.subscribed_stores")}
                count={homeData.SubscribedStoresCount || 0}
                icon={<AssignmentTurnedIn fontSize="large" color="info" />}
                loading={isLoading}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <StatisticCard
                title={t("dashboard.total_employees")}
                count={homeData.countEmployees || 0}
                icon={<People fontSize="large" color="primary" />}
                loading={isLoading}
              />
            </Grid>
          </Grid>

          <TitleTypography
            variant="h4"
            gutterBottom
            sx={{ mb: 3, fontWeight: 600 }}
          >
            {t("dashboard.analysis")}
          </TitleTypography>
          {/* Charts Section */}
          <Grid container spacing={gridSpacing}>
            {/* Monthly Orders Bar Chart */}
            <Grid size={{ xs: 12, md: 6 }}>
              <SubscriptionChart
                isLoading={isLoading}
                ordersData={ordersData}
              />
            </Grid>

            {/* Monthly Stores Bar Chart */}
            <Grid size={{ xs: 12, md: 6 }}>
              <StoresChart isLoading={isLoading} storesData={storesData} />
            </Grid>

            {/* Monthly Cars Bar Chart */}
            <Grid size={{ xs: 12, md: 6 }}>
              <CarsChart isLoading={isLoading} productsData={productsData} />
            </Grid>
          </Grid>

          <Grid container spacing={gridSpacing} mt={4}>
            {/* Roles Distribution Pie Chart */}
            <Grid size={{ xs: 12, md: 6 }}>
              <RolesPie isLoading={isLoading} homeData={homeData} />
            </Grid>

            {/* Services Usage Pie Chart */}
            <Grid size={{ xs: 12, md: 6 }}>
              <ServicesPie isLoading={isLoading} homeData={homeData} />
            </Grid>
          </Grid>
        </Role>
        <Role role={"store"}>
          <Grid container spacing={gridSpacing} sx={{ mb: 2 }}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <StatisticCard
                title={t("dashboard.total_cars")}
                count={homeData.countProduct || 0}
                icon={<TimeToLeaveIcon fontSize="large" color="primary" />}
                loading={isLoading}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <StatisticCard
                title={t("dashboard.total_offers")}
                count={homeData.countOffer || 0}
                icon={<LocalOffer fontSize="large" color="error" />}
                loading={isLoading}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <StatisticCard
                title={t("dashboard.total_subscription")}
                count={homeData.CountOrder || 0}
                icon={<ShoppingCart fontSize="large" color="secondary" />}
                loading={isLoading}
              />
            </Grid>
          </Grid>
        </Role>
      </Box>
    </Permission>
  );
};

export default Home;
