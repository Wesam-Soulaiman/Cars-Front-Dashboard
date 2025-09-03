import { styled, Typography } from "@mui/material";

const SectionTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: "calc(22px + 0.15vw)",
  fontWeight: "500",
  textTransform: "capitalize",
  marginBottom: "12px",
}));

export default SectionTitle;
