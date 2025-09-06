import { Typography } from "@mui/material";
import LoadingDataError from "../../../../components/LoadingDataError";
import { useGetSubscription } from "../../../../api/subscriptions";
import SubscriptionCountBarChartAnalysis from "./SubscriptionCountBarChartAnalysis";

const SubscriptionsBarAnalysis = () => {
  const subscription = useGetSubscription({
    page: 0,
    pageSize: 10,
    name: "",
    service_id: undefined,
    active: undefined,
    sort_by: undefined,
    sort_order: undefined,
  });

  if (subscription.isError) {
    return <LoadingDataError refetch={subscription.refetch} />;
  }

  if (subscription.isLoading) {
    return <Typography>Loading ...</Typography>;
  }

  const chartData =
    subscription.data?.data?.data.chart?.map((item) => ({
      y: item.order_count,
      x: item.month_name,
    })) || [];

  return <SubscriptionCountBarChartAnalysis subData={chartData} />;
};

export default SubscriptionsBarAnalysis;
