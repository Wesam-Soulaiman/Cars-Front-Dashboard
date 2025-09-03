import { Box, Divider, Skeleton } from "@mui/material";
import Grid from "@mui/material/Grid";
import useGetMyProfile from "../../../api/useGetMyProfile";
import LoadingDataError from "../../../components/LoadingDataError";
import Permission from "../../../components/Permission";
import { gridSpacing } from "../../../config";
import MainCard from "../../../components/MainCard";
import Details from "./components/Details";
import ShowroomSubscriptionList from "./components/ShowroomSubscriptionList";
import Role from "../../../components/Role";

const MyShowroomProfile = () => {
  const myProfile = useGetMyProfile();
  if (myProfile.isError) {
    return <LoadingDataError refetch={myProfile.refetch} />;
  }

  return (
    <Role role={"store"}>
      <Box>
        <Grid container spacing={gridSpacing}>
          <Details showroom={myProfile} />
          <Permission permission="orders.view">
            <Grid size={12}>
              <Divider />
            </Grid>
            <Grid size={12}>
              {myProfile.isLoading ? (
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
        </Grid>
      </Box>
    </Role>
  );
};

export default MyShowroomProfile;
