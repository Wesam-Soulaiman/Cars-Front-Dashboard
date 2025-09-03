import {
  Paper,
  Typography,
  Skeleton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import PieChart from "../../../../../components/charts/PieChart";
import useGetTranslation from "../../../../../utils/useGetTranslation";

const ServicesPie = ({ isLoading, homeData }) => {
  const { t } = useTranslation();
  const { getTranslation2 } = useGetTranslation();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const servicesData = {
    options: {
      labels:
        homeData.getServicesCount?.map((item) =>
          getTranslation2(item, "name")
        ) || [],
      colors: [
        theme.palette.success.main,
        theme.palette.primary.main,
        theme.palette.info.main,
        theme.palette.warning.main,
        theme.palette.secondary.main,
      ],
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: isSmallScreen,
            },
          },
        },
      },
    },
    series: homeData.getServicesCount?.map((item) => item.total) || [],
  };

  return (
    <Paper
      sx={{
        p: { xs: 1.5, sm: 3 },
        borderRadius: 4,
        height: "100%",
        minHeight: 350,
        display: "flex",
        flexDirection: "column",
        background: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        {t("dashboard.sub_distribution")}
      </Typography>
      {isLoading ? (
        <Skeleton variant="rectangular" height={300} sx={{ flex: 1 }} />
      ) : (
        <div style={{ flex: 1, minHeight: 250 }}>
          <PieChart
            options={servicesData.options}
            series={servicesData.series}
            height="100%"
          />
        </div>
      )}
    </Paper>
  );
};

export default ServicesPie;
