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
import CarInfoForm from "../../../../components/forms/CarInfoForm";
import { useUpdateStoreType } from "../../../../api/storeType";

const UpdateStoreType = ({ storeType }) => {
  const updateStoreType = useUpdateStoreType();
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
            {t("edit_pop.title", { thetypes: t("thetypes.storeType") })}
          </DialogTitle>
          <DialogContent>
            <CarInfoForm
              initialValues={{
                name: storeType.name,
                name_ar: storeType.name_ar,
              }}
              task="update"
              loadingButtonProps={{
                loading: updateStoreType.isPending,
              }}
              onSubmit={async (values) => {
                await updateStoreType.mutateAsync({
                  data: values,
                  id: storeType.id,
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

export default UpdateStoreType;
