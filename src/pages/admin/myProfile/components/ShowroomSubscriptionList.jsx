import { Box, Skeleton, Stack, styled, Typography } from "@mui/material";
import { FixedSizeList as List } from "react-window";
import { useTranslation } from "react-i18next";

import { IoExtensionPuzzleOutline } from "react-icons/io5";
import useGetTranslation from "../../../../utils/useGetTranslation";
import MainCard from "../../../../components/MainCard";
import TitleTypography from "../../../../components/TitleTypography";
import { useGetSubscription } from "../../../../api/subscriptions";
import { useAuthContext } from "../../../../providers/AuthProvider";

// Styled Typography
const InformationTypography = styled(Typography)(({ theme }) => ({
  fontSize: "calc(16px + 0.02vw)",
  color: theme.palette.text.secondary,
}));

// Subscription Card Renderer
const Subscription = ({ index, style, data }) => {
  const subscription = data[index];
  const { t } = useTranslation();
  const { getTranslation2 } = useGetTranslation();

  return (
    <div style={{ ...style, width: "300px", paddingRight: 16 }} key={index}>
      <MainCard border={false} sx={{ height: "100%" }}>
        <TitleTypography>{t("showroomProfile.sub_pan")}</TitleTypography>
        <Stack gap={2} mt={2}>
          <InformationTypography>
            <strong>{t("showroomProfile.package")}:</strong>{" "}
            {getTranslation2(subscription, "service_name")}
          </InformationTypography>
          <InformationTypography>
            <strong>{t("showroomProfile.price")}:</strong> {subscription?.price}{" "}
            {t("common.currency")}
          </InformationTypography>
          <InformationTypography>
            <strong>{t("showroomProfile.subsc_at")}:</strong>{" "}
            {subscription.start_time}
          </InformationTypography>
          <InformationTypography>
            <strong>{t("showroomProfile.experid_on")}:</strong>{" "}
            {subscription.end_time}
          </InformationTypography>
          <InformationTypography
            sx={{
              color: subscription.day_left < 7 ? "error.main" : "success.main",
              fontWeight: 500,
            }}
          >
            <strong>
              {t("showroomProfile.renew", { days_left: subscription.day_left })}
            </strong>
          </InformationTypography>
        </Stack>
      </MainCard>
    </div>
  );
};

// Loading Skeleton
const LoadingSkeleton = () => (
  <Box display="flex" gap={3} overflow="hidden">
    {[1, 2, 3].map((item) => (
      <MainCard key={item} border={false} sx={{ width: 300, height: 250 }}>
        <Skeleton width="60%" height={30} variant="text" />
        <Box mt={2}>
          <Skeleton width="80%" height={24} variant="text" />
          <Skeleton width="70%" height={24} variant="text" />
          <Skeleton width="75%" height={24} variant="text" />
          <Skeleton width="65%" height={24} variant="text" />
          <Skeleton width="50%" height={24} variant="text" sx={{ mt: 1 }} />
        </Box>
      </MainCard>
    ))}
  </Box>
);

// Empty State
const EmptyState = () => {
  const { t } = useTranslation();
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      py={6}
      textAlign="center"
    >
      <IoExtensionPuzzleOutline
        size={48}
        style={{ opacity: 0.5, marginBottom: 16 }}
      />
      <Typography variant="h6" color="text.secondary">
        {t("showroomProfile.no_subscriptions")}
      </Typography>
      <Typography variant="body2" color="text.disabled" mt={1}>
        {t("showroomProfile.no_subscriptions_desc")}
      </Typography>
    </Box>
  );
};

// Horizontal Subscription List
const ShowroomSubscriptionList = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAuthContext();

  const { data, isLoading, isError } = useGetSubscription({
    page: 0,
    per_page: 10,
    store_id: user.id,
  });

  const subscriptions = data?.data?.data?.products || [];
  const hasSubscriptions = subscriptions.length > 0;

  return (
    <Box>
      <TitleTypography>{t("showroomProfile.packages")}</TitleTypography>

      {isLoading ? (
        <LoadingSkeleton />
      ) : isError ? (
        <Typography color="error">{t("common.loading_error")}</Typography>
      ) : !hasSubscriptions ? (
        <EmptyState />
      ) : (
        <Box mt={3}>
          <List
            itemCount={subscriptions.length}
            itemSize={310}
            direction={i18n.language === "ar" ? "rtl" : "ltr"}
            height={400}
            width={1000}
            itemData={subscriptions}
            layout="horizontal"
            style={{ width: "100%", marginTop: "20px" }}
          >
            {Subscription}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default ShowroomSubscriptionList;
