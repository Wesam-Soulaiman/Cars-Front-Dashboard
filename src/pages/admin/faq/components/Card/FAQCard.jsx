import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";
import { MdExpandMore } from "react-icons/md";
import { CgSearchLoading } from "react-icons/cg";
import useGetTranslation from "../../../../../utils/useGetTranslation";
import DeleteFaq from "../DeleteFaq";
import UpdateFaq from "../UpdateFaq";
import Permission from "../../../../../components/Permission";

const FAQCard = ({ faq, open, handleChange, isLoading = false }) => {
  const { getTranslation2 } = useGetTranslation();

  return (
    <Accordion
      slotProps={{ transition: { unmountOnExit: true } }}
      expanded={open}
      onChange={() => handleChange(faq?.id || 0)}
    >
      <AccordionSummary
        expandIcon={<MdExpandMore size={20} />}
        aria-controls={`${faq?.id}`}
      >
        {!isLoading && (
          <Typography component="span" sx={{ width: "33%", flexShrink: 0 }}>
            {getTranslation2(faq, "question")}
          </Typography>
        )}
        {isLoading && <Skeleton variant="text" width={"100%"} />}
      </AccordionSummary>

      <AccordionDetails>
        {isLoading && (
          <>
            <Skeleton variant="text" width={"100%"} />
            <Skeleton variant="text" width={"95%"} />
            <Skeleton variant="text" width={"90%"} />
          </>
        )}
        {!isLoading && (
          <Typography>{getTranslation2(faq, "answer")}</Typography>
        )}
      </AccordionDetails>

      <AccordionActions>
        <Permission permission="FAQ.delete">
          {isLoading ? (
            <IconButton>
              <CgSearchLoading />
            </IconButton>
          ) : (
            <DeleteFaq faq={faq} />
          )}
        </Permission>
        <Permission permission="FAQ.update">
          {isLoading ? (
            <IconButton>
              <CgSearchLoading />
            </IconButton>
          ) : (
            <UpdateFaq faq={faq} />
          )}
        </Permission>
      </AccordionActions>
    </Accordion>
  );
};

export default FAQCard;
