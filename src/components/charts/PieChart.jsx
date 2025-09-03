import ReactApexChart from "react-apexcharts";

const pieChartOptions = {
  chart: {
    height: 450,
    type: "pie",
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: true,
    formatter: function (val) {
      return Math.round(val) + "%";
    },
  },
  legend: {
    position: "bottom",
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
};

const PieChart = ({ ...apexProps }) => {
  apexProps.options = {
    ...pieChartOptions,
    ...apexProps.options,
  };
  return <ReactApexChart {...apexProps} type="pie" />;
};

export default PieChart;
