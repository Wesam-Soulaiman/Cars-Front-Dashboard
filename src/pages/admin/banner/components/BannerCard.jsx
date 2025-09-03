import { CardActions, CardMedia } from "@mui/material";
import MainCard from "../../../../components/MainCard";
import DeleteBanner from "./DeleteBanner";
import UpdateBanner from "./UpdateBanner";
import ActivationBanner from "./ActivationBanner";
import Permission from "../../../../components/Permission";

const BannerCard = ({ banner }) => {
  return (
    <Permission permission="banners.view">
      <MainCard border={false} cardContent={false} sx={{ p: 0 }}>
        <CardMedia
          component="img"
          image={banner.photo}
          alt={banner.image}
          height={192}
          sx={{
            borderRadius: "10px",
          }}
        />
        <CardMedia
          component="img"
          image={banner.photo_ar}
          alt={banner.image}
          height={192}
          sx={{
            borderRadius: "10px",
          }}
        />
        <CardActions>
          <Permission permission="banners.update">
            <ActivationBanner banner={banner} />
            <UpdateBanner banner={banner} />
          </Permission>
          <Permission permission="banners.delete">
            <DeleteBanner banner={banner} />
          </Permission>
        </CardActions>
      </MainCard>
    </Permission>
  );
};

export default BannerCard;
