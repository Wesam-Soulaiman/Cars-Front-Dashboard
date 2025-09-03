import Grid from "@mui/material/Grid";
import { Box, Divider, Typography } from "@mui/material";
import { gridSpacing } from "../../../config";
import LoadingDataError from "../../../components/LoadingDataError";
import { useTranslation } from "react-i18next";
import { useGetBanners } from "../../../api/banner";
import AddBanner from "./components/AddBanner";
import BannerCard from "./components/BannerCard";
import Permission from "../../../components/Permission";

const Banners = () => {
  const { t } = useTranslation();
  const banners = useGetBanners();

  if (banners.isError) {
    return <LoadingDataError refetch={banners.refetch} />;
  }

  if (banners.isLoading) {
    return <Typography>{t("global.loading")}...</Typography>;
  }

  return (
    <Permission permission="banners.view">
      <Box>
        <Grid container spacing={gridSpacing}>
          <Permission permission="banners.create">
            <Grid size={12}>
              <AddBanner />
            </Grid>
            <Grid size={12}>
              <Divider />
            </Grid>
          </Permission>

          {banners.data?.data?.data.length === 0 && (
            <Typography>{t("nodata", { slug: t("slugs.banner") })}</Typography>
          )}

          <Grid size={12}>
            <Grid container spacing={gridSpacing}>
              {banners.data?.data?.data.map((banner, i) => (
                <Grid key={i} size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
                  <BannerCard banner={banner} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Permission>
  );
};

export default Banners;
