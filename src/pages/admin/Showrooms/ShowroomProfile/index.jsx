import { Box, Divider, Skeleton } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useGetShowroomDetails } from "../../../../api/showrooms";
import LoadingDataError from "../../../../components/LoadingDataError";
import { gridSpacing } from "../../../../config";
import UpdateShowroom from "./components/UpdateShowroom";
import DeleteShowroom from "./components/DeleteShowroom";
import Details from "./components/Details";
import MainCard from "../../../../components/MainCard";
import ShowroomSubscriptionList from "./components/ShowroomSubscriptionList";
import ShowroomCars from "./components/ShowroomCars";
import UpdatePassword from "./components/UpdatePassword";
import Permission from "../../../../components/Permission";

const ShowroomProfile = () => {
  const showroom = useGetShowroomDetails();
  if (showroom.isError) {
    return <LoadingDataError refetch={showroom.refetch} />;
  }

  return (
    <Permission permission="stores.view">
      <Box>
        <Grid container spacing={gridSpacing}>
          <Details showroom={showroom} />
          <Permission permission="orders.view">
            <Grid size={12}>
              <Divider />
            </Grid>
            <Grid size={12}>
              {showroom.isLoading ? (
                <MainCard border={false}>
                  <Skeleton width={150} variant="text" />
                  <Skeleton width={140} variant="text" />
                  <Skeleton width={130} variant="text" />
                  <Skeleton width={120} variant="text" />
                </MainCard>
              ) : (
                <ShowroomSubscriptionList />
              )}
            </Grid>
          </Permission>
          <Permission permission="products.view">
            <Grid size={12}>
              <Divider />
            </Grid>
            <Grid size={12}>
              <ShowroomCars />
            </Grid>
          </Permission>
          <Permission permission="stores.update">
            <Grid size={12}>
              <Divider />
            </Grid>
            <UpdateShowroom showroom={showroom} />
            <Grid size={12}>
              <Divider />
            </Grid>
            <UpdatePassword showroom={showroom} />
          </Permission>
          <Permission permission="stores.delete">
            <Grid size={12}>
              <Divider />
            </Grid>
            <DeleteShowroom />
          </Permission>
        </Grid>
      </Box>
    </Permission>
  );
};

export default ShowroomProfile;
