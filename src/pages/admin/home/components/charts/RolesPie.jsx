import { Paper, Typography, Skeleton, useTheme } from "@mui/material";

import { useTranslation } from "react-i18next";
import PieChart from "../../../../../components/charts/PieChart";
import useGetTranslation from "../../../../../utils/useGetTranslation";

const RolesPie = ({ isLoading, homeData }) => {
  const { t } = useTranslation();
  const { getTranslation2 } = useGetTranslation();
  const theme = useTheme();

  // Roles data for pie chart
  const rolesData = {
    options: {
      labels:
        homeData.rolesCount?.map((item) => getTranslation2(item, "name")) || [],
      colors: [
        theme.palette.info.main,
        theme.palette.primary.main,
        theme.palette.success.main,
        theme.palette.warning.main,
        theme.palette.secondary.main,
      ],
      legend: {
        position: "bottom",
        labels: {
          colors: theme.palette.text.primary,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
    series: homeData.rolesCount?.map((item) => item.count) || [],
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        height: "100%",
        background: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        {t("dashboard.roles_distribution")}
      </Typography>
      {isLoading ? (
        <Skeleton variant="rectangular" height={300} />
      ) : (
        <PieChart
          options={rolesData.options}
          series={rolesData.series}
          height="100%"
        />
      )}
    </Paper>
  );
};

export default RolesPie;
