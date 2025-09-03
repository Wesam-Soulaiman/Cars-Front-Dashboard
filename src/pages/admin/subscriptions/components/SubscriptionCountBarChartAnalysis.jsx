import { useTheme } from "@mui/material";
import BarChart from "../../../../components/charts/BarChart";

const SubscriptionCountBarChartAnalysis = ({
  subData,
  categories,
  isLoading,
}) => {
  const theme = useTheme();

  return (
    <BarChart
      type="bar"
      series={[
        {
          name: "عدد الإشتراكات",
          color: theme.palette.secondary.dark,
          data: subData,
        },
      ]}
      options={{
        legend: {
          labels: {
            colors: [theme.palette.text.primary, theme.palette.text.primary],
          },
          markers: {
            fillColors: [
              theme.palette.secondary.dark,
              theme.palette.primary.dark,
            ],
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            opacityFrom: 0.3,
            opacityTo: 0.8,
          },
        },
        dataLabels: {
          style: {
            colors: [theme.palette.text.primary],
          },
        },
        colors: [theme.palette.info.main],
        plotOptions: {
          bar: {
            horizontal: true,
            borderRadius: 5,
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: Array(subData?.length).fill(theme.palette.text.primary),
            },
          },
        },
        tooltip: {
          theme: theme.palette.mode,
        },
        xaxis: {
          labels: {
            style: {
              colors: [theme.palette.text.primary],
            },
          },
        },
        grid: {
          borderColor: theme.palette.divider,
        },
      }}
    />
  );
};

export default SubscriptionCountBarChartAnalysis;
