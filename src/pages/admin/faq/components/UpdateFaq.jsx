import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import { MdModeEditOutline } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { useUpdateFaq } from "../../../../api/faq";
import PopupButton from "../../../../components/PopupButton";
import FAQForm from "./Form/FAQForm";

const UpdateFaq = ({ faq }) => {
  const updateFaq = useUpdateFaq();
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
      title="edit"
      DialogRender={({ props, handleClose }) => (
        <Dialog {...props}>
          <DialogTitle>
            {t("edit_pop.title", { thetypes: t("thetypes.faq") })}
          </DialogTitle>
          <DialogContent>
            <FAQForm
              initialValues={faq}
              task="update"
              loadingButtonProps={{
                loading: updateFaq.isPending,
              }}
              onSubmit={(values) => {
                updateFaq.mutateAsync({ data: values, id: faq.id });
                handleClose();
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    />
  );
};

export default UpdateFaq;
