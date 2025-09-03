import { Box, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const FileImagePicker = ({
  title,
  description,
  renderContent,
  onSelectImage,
  containerProps,
  ...inputProps
}) => {
  const { t } = useTranslation();

  return (
    <Box {...containerProps}>
      <Box
        component="label"
        sx={{
          p: 2,
          borderRadius: "10px",
          width: "100%",
          height: "100%",
          display: "flex",
          border: (theme) => `2px dashed ${theme.palette.divider}`,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          cursor: "pointer",
        }}
        role={undefined}
        tabIndex={-1}
      >
        <VisuallyHiddenInput
          type="file"
          onChange={(event) => {
            if (onSelectImage) {
              onSelectImage(event.target.files);
            }
          }}
          {...inputProps}
        />
        <Typography
          variant="h4"
          sx={{
            textTransform: "uppercase",
            textAlign: "center",
            mb: 2,
          }}
        >
          {title || "File Upload"}
        </Typography>

        <Typography>{description || t("imagePicker.pickFile")}</Typography>

        {renderContent && renderContent()}
      </Box>
    </Box>
  );
};

export default FileImagePicker;
