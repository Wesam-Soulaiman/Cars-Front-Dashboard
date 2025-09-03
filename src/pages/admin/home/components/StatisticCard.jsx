import { Skeleton, Stack, Typography, Box } from "@mui/material";
import MainCard from "../../../../components/MainCard";

const StatisticCard = ({ title, count, loading = false, icon, subTitle }) => {
  return (
    <MainCard contentProps={{ sx: { p: 2.25, height: 100 } }}>
      <Stack spacing={0.5}>
        {loading ? (
          <>
            <Skeleton variant="text" width={"60%"} height={24} />
            <Skeleton variant="text" width={"40%"} height={32} />
            {subTitle && <Skeleton variant="text" width={"50%"} height={20} />}
          </>
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1.5,
                mb: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  mb: 1,
                }}
              >
                {icon}
                <Typography variant="subtitle1" color="text.secondary">
                  {title}
                </Typography>
              </Box>
              <Typography variant="h4" fontWeight="bold" sx={{ mb: 0.5 }}>
                {count}
              </Typography>
            </Box>
            {subTitle && (
              <Typography variant="subtitle1" color="text.secondary">
                {subTitle}
              </Typography>
            )}
          </>
        )}
      </Stack>
    </MainCard>
  );
};

export default StatisticCard;
