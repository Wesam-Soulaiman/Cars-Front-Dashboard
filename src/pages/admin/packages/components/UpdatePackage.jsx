import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import { MdModeEditOutline } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { useUpdatePackage } from "../../../../api/packages";
import PopupButton from "../../../../components/PopupButton";
import PackageForm from "./PackageForm";

const UpdatePackage = ({ packages }) => {
  const updatePackage = useUpdatePackage();
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
            {t("edit_pop.title", { thetypes: t("thetypes.package") })}
          </DialogTitle>
          <DialogContent>
            <PackageForm
              initialValues={{
                name: packages.name,
                name_ar: packages.name_ar,
                description: packages.description,
                description_ar: packages.description_ar,
                category_service_id: packages.category_id,
              }}
              task="update"
              loadingButtonProps={{
                loading: updatePackage.isPending,
              }}
              onSubmit={async (values) => {
                await updatePackage.mutateAsync({
                  data: values,
                  id: packages.id,
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

export default UpdatePackage;
