import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import ShowroomForm from "./components/ShowroomForm";
import { useCreateShowroom } from "../../../api/showrooms";
import Permission from "../../../components/Permission";

const CreateShowroom = () => {
  const { t } = useTranslation();
  const createShowroom = useCreateShowroom();

  return (
    <Permission permission="stores.create">
      <Box>
        <Typography variant="h3" mb={2}>
          {t("forms.create", { types: t("types.showroom") })}
        </Typography>
        <ShowroomForm
          onSubmit={(values) => createShowroom.mutateAsync(values)}
          loading={createShowroom.isPending}
        />
      </Box>
    </Permission>
  );
};

export default CreateShowroom;
