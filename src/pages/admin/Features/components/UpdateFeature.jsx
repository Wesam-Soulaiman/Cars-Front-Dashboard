import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import { MdModeEditOutline } from "react-icons/md";
import { useTranslation } from "react-i18next";
import PopupButton from "../../../../components/PopupButton";
import { useUpdateFeature } from "../../../../api/feature";
import FeatureForm from "./FeatureForm";

const UpdateFeature = ({ feature }) => {
  const updateFeature = useUpdateFeature();
  const { t } = useTranslation();

  return (
    <PopupButton
      ButtonComponentRender={({ handleOpen }) => (
        <Tooltip title={t("edit_pop.tooltip")}>
          <IconButton
            color="warning"
            onClick={(e) => {
              e.currentTarget.blur();
              requestAnimationFrame(() => {
                handleOpen();
              });
            }}
          >
            <MdModeEditOutline />
          </IconButton>
        </Tooltip>
      )}
      DialogRender={({ props, handleClose }) => (
        <Dialog {...props}>
          <DialogTitle>
            {t("edit_pop.title", { thetypes: t("thetypes.feature") })}
          </DialogTitle>
          <DialogContent>
            <FeatureForm
              initialValues={{
                name: feature.name,
                name_ar: feature.name_ar,
              }}
              task="update"
              loadingButtonProps={{
                loading: updateFeature.isPending,
              }}
              onSubmit={async (values) => {
                await updateFeature.mutateAsync({
                  data: values,
                  id: feature.id,
                });
                handleClose();
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    />
  );
};

export default UpdateFeature;
