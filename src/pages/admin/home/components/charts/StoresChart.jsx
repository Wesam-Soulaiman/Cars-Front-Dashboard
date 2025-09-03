import { Paper, Typography, Skeleton, useTheme } from "@mui/material";

import { useTranslation } from "react-i18next";
import BarChart from "../../../../../components/charts/BarChart";

const StoresChart = ({ isLoading, storesData }) => {
  const { t } = useTranslation();
  const theme = useTheme();
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
        {t("dashboard.monthly_stores")}
      </Typography>
      {isLoading ? (
        <Skeleton variant="rectangular" height={300} />
      ) : (
        <BarChart
          type="bar"
          series={[
            {
              name: t("dashboard.stores"),
              color: theme.palette.success.main,
              data: storesData,
            },
          ]}
          options={{
            legend: {
              labels: {
                colors: [theme.palette.text.primary],
              },
            },
            fill: {
              type: "gradient",
              gradient: {
                opacityFrom: 0.3,
                opacityTo: 0.8,
              },
            },
            colors: [theme.palette.success.main],
            plotOptions: {
              bar: {
                borderRadius: 5,
              },
            },
            yaxis: {
              labels: {
                style: {
                  colors: theme.palette.text.primary,
                },
              },
            },
            tooltip: {
              theme: theme.palette.mode,
            },
            xaxis: {
              labels: {
                style: {
                  colors: theme.palette.text.primary,
                },
              },
            },
            grid: {
              borderColor: theme.palette.divider,
            },
          }}
        />
      )}
    </Paper>
  );
};

export default StoresChart;
