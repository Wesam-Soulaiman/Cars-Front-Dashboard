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
import { useUpdateBanner } from "../../../../api/banner";
import BannerForm from "./BannerForm";

const UpdateBanner = ({ banner }) => {
  const updateBanner = useUpdateBanner();
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
            {t("edit_pop.title", { thetypes: t("thetypes.banner") })}
          </DialogTitle>
          <DialogContent>
            <BannerForm
              initialValues={{
                photo: banner.photo,
                photo_ar: banner.photo_ar,
              }}
              task="update"
              loadingButtonProps={{
                loading: updateBanner.isPending,
              }}
              onSubmit={async (values) => {
                const formData = new FormData();
                if (values.photo instanceof File) {
                  formData.append("photo", values.photo);
                } else if (values.photo === null) {
                  formData.append("photo", "");
                }
                if (values.photo_ar instanceof File) {
                  formData.append("photo_ar", values.photo_ar);
                } else if (values.photo_ar === null) {
                  formData.append("photo_ar", "");
                }

                await updateBanner.mutateAsync({
                  data: formData,
                  id: banner.id,
                  photoUrl:
                    typeof values.photo === "string" ? values.photo : undefined,
                  photo_arUrl:
                    typeof values.photo_ar === "string"
                      ? values.photo_ar
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

export default UpdateBanner;
