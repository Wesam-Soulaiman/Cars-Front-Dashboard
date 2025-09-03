import { Box } from "@mui/material";
import { lazy } from "react";
import { useTranslation } from "react-i18next";
import Loadable from "../../../components/Loadable";
import MainCard from "../../../components/MainCard";
import SectionTitle from "../../../components/SectionTitle";
import SubscriptionTable from "./components/subscriptionTable";
import Permission from "../../../components/Permission";

const SubscriptionsBarAnalysis = Loadable(
  lazy(() => import("./components/SubscriptionsBarAnalysis "))
);

const Subscriptions = () => {
  const { t } = useTranslation();
  return (
    <Permission permission="orders.view">
      <Box>
        <SubscriptionTable />
        <Permission permission="dashboard.access">
          <Box mt={2}>
            <MainCard>
              <SectionTitle sx={{ color: "text.primary" }}>
                {t("subscriptions.title")}
              </SectionTitle>
              <SubscriptionsBarAnalysis />
            </MainCard>
          </Box>
        </Permission>
      </Box>
    </Permission>
  );
};

export default Subscriptions;
