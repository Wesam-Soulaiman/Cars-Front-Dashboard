import ReactApexChart from "react-apexcharts";

const areaChartOptions = {
  chart: {
    height: 450,
    type: "area",
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

const AreaChart = ({ ...apexProps }) => {
  apexProps.options = {
    ...areaChartOptions,
    ...apexProps.options,
  };
  return <ReactApexChart {...apexProps} type="area" />;
};

export default AreaChart;
