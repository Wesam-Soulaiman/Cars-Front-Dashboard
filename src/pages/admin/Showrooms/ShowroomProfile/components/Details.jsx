import {
  alpha,
  Box,
  Skeleton,
  Typography,
  useTheme,
  Avatar,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import useGetTranslation from "../../../../../utils/useGetTranslation";
import { FaLocationDot, FaPhone, FaEnvelope } from "react-icons/fa6";
import { IoCarSport } from "react-icons/io5";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { useTranslation } from "react-i18next";

const Details = ({ showroom }) => {
  const { getTranslation2 } = useGetTranslation();
  const { t } = useTranslation();
  const theme = useTheme();
  const data = showroom?.data?.data?.data || {};

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
            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.05),
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
          {showroom.isLoading ? (
            <Skeleton
              variant="rectangular"
              width="100%"
              height="100%"
              animation="wave"
            />
          ) : data.photo ? (
            <img
              src={data.photo}
              alt={data.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                objectPosition: "center",
              }}
            />
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
              {data.name?.charAt(0)?.toUpperCase() || "C"}
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
          <Box mb={{ xs: 2, md: 3 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              sx={{
                fontSize: { xs: "1.8rem", sm: "2.2rem", lg: "2.5rem" },
                lineHeight: 1.2,
              }}
            >
              {showroom.isLoading ? (
                <Skeleton
                  width="80%"
                  height={60}
                  animation="wave"
                  sx={{ mx: "auto" }}
                />
              ) : (
                getTranslation2(data, "name")
              )}
            </Typography>

            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              mb={1.5}
              justifyContent={{ xs: "center", lg: "flex-start" }}
            >
              <FaLocationDot size={20} color={theme.palette.error.main} />
              {showroom.isLoading ? (
                <Skeleton width="70%" height={28} animation="wave" />
              ) : (
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{
                    fontSize: { xs: "0.95rem", sm: "1.05rem" },
                    maxWidth: "600px",
                  }}
                >
                  {getTranslation2(data, "address")}
                </Typography>
              )}
            </Stack>
          </Box>

          <Divider
            sx={{
              my: { xs: 2, md: 3 },
              borderColor: alpha(theme.palette.divider, 0.3),
              borderWidth: 1,
              width: { xs: "80%", lg: "100%" },
              mx: "auto",
            }}
          />

          {/* Stats Section */}
          <Box mb={{ xs: 2, md: 3 }}>
            <Stack
              direction="row"
              spacing={3}
              justifyContent={{ xs: "center", lg: "flex-start" }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                <IoCarSport size={22} color={theme.palette.primary.main} />
                {showroom.isLoading ? (
                  <Skeleton width={120} height={28} animation="wave" />
                ) : (
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 500,
                      fontSize: { xs: "1rem", sm: "1.1rem" },
                    }}
                  >
                    <strong>{data.count_products}</strong>{" "}
                    {t("showroomProfile.available")}
                  </Typography>
                )}
              </Stack>
            </Stack>
          </Box>

          {/* Contact Info Section */}
          <Box
            sx={{
              mt: "auto",
              width: "100%",
            }}
          >
            <Grid
              container
              spacing={2}
              justifyContent={{ xs: "center", lg: "flex-start" }}
            >
              {data.phone && (
                <Grid size={12}>
                  <Stack
                    direction="row"
                    spacing={1.5}
                    alignItems="center"
                    justifyContent={{ xs: "center", lg: "flex-start" }}
                  >
                    <FaPhone size={18} color={theme.palette.success.main} />
                    {showroom.isLoading ? (
                      <Skeleton width={160} height={28} animation="wave" />
                    ) : (
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 500,
                          fontSize: { xs: "0.95rem", sm: "1rem" },
                          "&:hover": {
                            color: theme.palette.success.main,
                            textDecoration: "underline",
                            cursor: "pointer",
                          },
                        }}
                        onClick={() =>
                          (window.location.href = `tel:${data.phone}`)
                        }
                      >
                        {data.phone}
                      </Typography>
                    )}
                  </Stack>
                </Grid>
              )}

              {data.email && (
                <Grid size={12}>
                  <Stack
                    direction="row"
                    spacing={1.5}
                    alignItems="center"
                    justifyContent={{ xs: "center", lg: "flex-start" }}
                  >
                    <FaEnvelope size={18} color={theme.palette.info.main} />
                    {showroom.isLoading ? (
                      <Skeleton width={200} height={28} animation="wave" />
                    ) : (
                      <Typography
                        variant="body1"
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
                          (window.location.href = `mailto:${data.email}`)
                        }
                      >
                        {data.email}
                      </Typography>
                    )}
                  </Stack>
                </Grid>
              )}
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Details;
