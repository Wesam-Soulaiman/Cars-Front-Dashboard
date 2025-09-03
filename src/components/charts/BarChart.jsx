import ReactApexChart from "react-apexcharts";

const areaChartOptions = {
  chart: {
    height: 450,
    type: "bar",
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  grid: {
    strokeDashArray: 0,
  },
};

const BarChart = (apexProps) => {
  const mergedOptions = {
    ...areaChartOptions,
    ...apexProps.options,
  };

  return <ReactApexChart {...apexProps} options={mergedOptions} />;
};

export default BarChart;
