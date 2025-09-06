import {
  alpha,
  Box,
  Skeleton,
  Typography,
  useTheme,
  Avatar,
  Stack,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { useTranslation } from "react-i18next";
import useGetTranslation from "../../../../../utils/useGetTranslation";
import { FaLocationDot } from "react-icons/fa6";
import {
  IoCalendar,
  IoPeople,
  IoColorPalette,
  IoConstruct,
  IoPerson,
} from "react-icons/io5";
import { GiCarWheel, GiGasPump } from "react-icons/gi";
import { BsSpeedometer2 } from "react-icons/bs";
import { fuelData } from "../../../../../data/fuelData";
import { driveTypeData } from "../../../../../data/driveTypeData";
import { gearsTypesData } from "../../../../../data/gearsTypesData";
import useGetLabel from "../../../../../utils/useGetLabel";
import { useNavigate } from "react-router-dom";

const Details = ({ car }) => {
  const { getTranslation2 } = useGetTranslation();
  const { getDataLabel } = useGetLabel();
  const { t } = useTranslation();
  const theme = useTheme();
  const data = car?.data?.data?.data || {};
  const navigate = useNavigate();

  const details = [
    {
      icon: <GiGasPump size={22} color={theme.palette.primary.main} />,
      label: t("carProfile.fuel_type"),
      value: getTranslation2(data.fuel_type, "name"),
    },
    {
      icon: <GiCarWheel size={22} color={theme.palette.primary.main} />,
      label: t("carProfile.drive_type"),
      value: getDataLabel(driveTypeData, data.drive_type),
    },
    {
      icon: <IoConstruct size={22} color={theme.palette.primary.main} />,
      label: t("carProfile.gears"),
      value: getTranslation2(data.gear, "name"),
    },
    {
      icon: <BsSpeedometer2 size={22} color={theme.palette.primary.main} />,
      label: t("carProfile.mileage"),
      value: `${data.mileage?.toLocaleString()} km`,
    },
    {
      icon: <IoPeople size={22} color={theme.palette.primary.main} />,
      label: t("carProfile.seats"),
      value: data.number_of_seats,
    },
    {
      icon: <IoColorPalette size={22} color={theme.palette.primary.main} />,
      label: t("carProfile.color"),
      value: getTranslation2(data.color, "name"),
      // value: (
      //   <Box
      //     width={20}
      //     height={20}
      //     bgcolor={data.color}
      //     borderRadius="50%"
      //     border={`1px solid ${theme.palette.divider}`}
      //     mr={1}
      //   />
      // ),
    },
  ];

  return (
    <Grid container spacing={{ xs: 2, md: 4 }} sx={{ alignItems: "center" }}>
      {/* Image Column */}
      <Grid size={{ xs: 12, sm: 6 }}>
        <Box
          sx={{
            width: "100%",
            height: { xs: 280, lg: 350 },
            mx: "auto",
            borderRadius: 3,
            overflow: "hidden",
            backgroundColor: alpha(theme.palette.primary.main, 0.05),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.02)",
            },
            boxShadow: 2,
          }}
        >
          {car.isLoading ? (
            <Skeleton
              variant="rectangular"
              width="100%"
              height="100%"
              animation="wave"
            />
          ) : data.main_photo ? (
            <>
              <img
                src={data.main_photo}
                alt={data.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  objectPosition: "center",
                }}
              />
              {/* Price Badge */}
              <Box
                sx={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  backgroundColor: alpha(theme.palette.success.main, 0.95),
                  color: theme.palette.success.contrastText,
                  px: 1,
                  py: 0,
                  borderRadius: 1,
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  boxShadow: 2,
                }}
              >
                ${data.price?.toLocaleString()}
              </Box>
            </>
          ) : (
            <Avatar
              sx={{
                width: "100%",
                height: "100%",
                fontSize: "3rem",
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
              }}
            >
              {data.brand.name?.charAt(0)?.toUpperCase() || "C"}
            </Avatar>
          )}
        </Box>
      </Grid>

      {/* Content Column */}
      <Grid size={{ xs: 12, sm: 6 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            textAlign: { xs: "center", lg: "left" },
            px: { xs: 2, sm: 0 },
          }}
        >
          {/* Header Section */}
          <Box>
            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              sx={{
                fontSize: { xs: "1.8rem", sm: "2.2rem", lg: "2.5rem" },
                lineHeight: 1.2,
              }}
            >
              {car.isLoading ? (
                <Skeleton
                  width="80%"
                  height={60}
                  animation="wave"
                  sx={{ mx: "auto" }}
                />
              ) : (
                `${getTranslation2(data.brand, "name")} ${getTranslation2(
                  data.model,
                  "name"
                )} `
              )}
            </Typography>

            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              mt={1.5}
              justifyContent={{ xs: "center", lg: "flex-start" }}
            >
              <IoCalendar size={20} color={theme.palette.error.main} />
              {car.isLoading ? (
                <Skeleton width="70%" height={28} animation="wave" />
              ) : (
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{
                    fontSize: { xs: "0.95rem" },
                    maxWidth: "600px",
                  }}
                >
                  {data.year_of_construction}
                </Typography>
              )}
            </Stack>
            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              justifyContent={{ xs: "center", lg: "flex-start" }}
            >
              <FaLocationDot size={20} color={theme.palette.error.main} />
              {car.isLoading ? (
                <Skeleton width="70%" height={28} animation="wave" />
              ) : (
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{
                    fontSize: { xs: "0.95rem" },
                    maxWidth: "600px",
                  }}
                >
                  {getTranslation2(data.store, "address")}
                </Typography>
              )}
            </Stack>
            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              justifyContent={{ xs: "center", lg: "flex-start" }}
            >
              <IoPerson size={20} color={theme.palette.error.main} />
              {car.isLoading ? (
                <Skeleton width="70%" height={28} animation="wave" />
              ) : (
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{
                    fontWeight: 500,
                    fontSize: { xs: "0.95rem", sm: "1rem" },
                    "&:hover": {
                      color: theme.palette.info.main,
                      textDecoration: "underline",
                      cursor: "pointer",
                    },
                  }}
                  onClick={() =>
                    navigate(`/admin/dashboard/showrooms/${data.store_id}`)
                  }
                >
                  {getTranslation2(data.store, "name")}
                </Typography>
              )}
            </Stack>
          </Box>

          <Divider
            sx={{
              my: { xs: 2, md: 2 },
              borderColor: alpha(theme.palette.divider, 0.3),
              borderWidth: 1,
              width: { xs: "80%", lg: "100%" },
              mx: "auto",
            }}
          />

          {/* Details Section */}
          <Box mb={{ xs: 2, md: 3 }}>
            <Grid container spacing={2}>
              {details.map((item, index) => (
                <Grid size={{ xs: 6, sm: 4 }} key={index}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    {item.icon}
                    {car.isLoading ? (
                      <Skeleton width={120} height={28} animation="wave" />
                    ) : (
                      <Box>
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          sx={{ fontWeight: 500 }}
                        >
                          {item.label}
                        </Typography>
                        <Typography
                          variant="body1"
                          component="div"
                          sx={{
                            fontWeight: 600,
                            display: "inline-flex",
                            alignItems: "center",
                          }}
                        >
                          {item.value}
                        </Typography>
                      </Box>
                    )}
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Details;
