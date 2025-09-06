import PopupButton from "../../../../components/PopupButton";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import { MdModeEditOutline } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { useUpdateStructures } from "../../../../api/structures";
import StructuresForm from "./StructuresForm";

const UpdateStructures = ({ structures }) => {
  const updateStructures = useUpdateStructures();
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
            {t("edit_pop.title", { thetypes: t("thetypes.structures") })}
          </DialogTitle>
          <DialogContent>
            <StructuresForm
              isPopup
              initialValues={{
                name: structures.name,
                name_ar: structures.name_ar,
                main_photo: structures.main_photo,
              }}
              task="update"
              loadingButtonProps={{
                loading: updateStructures.isPending,
              }}
              onSubmit={async (values) => {
                const formData = new FormData();
                formData.append("name", values.name);
                formData.append("name_ar", values.name_ar);

                // Only append logo if it's a new file
                if (values.main_photo instanceof File) {
                  formData.append("main_photo", values.main_photo);
                } else if (values.main_photo === null) {
                  // Handle case when main_photo is removed
                  formData.append("main_photo", "");
                }

                await updateStructures.mutateAsync({
                  data: formData,
                  id: structures.id,
                  main_photoUrl:
                    typeof values.main_photo === "string"
                      ? values.main_photo
                      : undefined,
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

export default UpdateStructures;
