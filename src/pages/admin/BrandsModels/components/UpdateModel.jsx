import PopupButton from "../../../../components/PopupButton";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import { MdModeEditOutline } from "react-icons/md";
import { useUpdateModel } from "../../../../api/models/index";
import { useTranslation } from "react-i18next";
import ModelForm from "./ModelForm";

const UpdateModel = ({ model }) => {
  const updateModel = useUpdateModel();
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
            {t("edit_pop.title", { thetypes: t("thetypes.model") })}
          </DialogTitle>
          <DialogContent>
            <ModelForm
              initialValues={{
                name: model.name,
                name_ar: model.name_ar,
                brand_id: model.brand_id,
              }}
              task="update"
              loadingButtonProps={{
                loading: updateModel.isPending,
              }}
              onSubmit={async (values) => {
                await updateModel.mutateAsync({ data: values, id: model.id });
                handleClose();
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    />
  );
};

export default UpdateModel;
