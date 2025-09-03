import { Box, Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useGetCarDetails } from "../../../../api/cars";
import LoadingDataError from "../../../../components/LoadingDataError";
import { gridSpacing } from "../../../../config";
import UpdateCar from "./components/UpdateCar";
import DeleteCar from "./components/DeleteCar";
import Details from "./components/Details";
import Permission from "../../../../components/Permission";

const CarProfile = () => {
  const car = useGetCarDetails();

  if (car.isError) {
    return <LoadingDataError refetch={car.refetch} />;
  }

  return (
    <Permission permission="products.view">
      <Box>
        <Grid container spacing={gridSpacing}>
          <Grid size={12}>
            <Details car={car} />
          </Grid>
          <Permission permission="products.update">
            <Grid size={12}>
              <Divider />
            </Grid>
            <UpdateCar car={car} />
          </Permission>
          <Permission permission="products.delete">
            <Grid size={12}>
              <Divider />
            </Grid>
            <DeleteCar />
          </Permission>
        </Grid>
      </Box>
    </Permission>
  );
};

export default CarProfile;
