import { useEffect, useState } from "react";
import { Box, Divider, Stack } from "@mui/material";
import { useCreateFaq, useGetFaqs } from "../../../api/faq";
import FAQCard from "./components/Card/FAQCard";
import FAQForm from "./components/Form/FAQForm";
import LoadingDataError from "../../../components/LoadingDataError";
import Permission from "../../../components/Permission";

const FAQs = () => {
  const [expanded, setExpanded] = useState(1);
  const { data, isError, isLoading, refetch } = useGetFaqs({
    page: 1,
    per_page: 15,
  });
  const createFaq = useCreateFaq();

  useEffect(() => {
    if (!isLoading && !isError) {
      setExpanded(data?.data?.data?.[0]?.id || false);
    }
  }, [isLoading, isError, data?.data]);

  if (isLoading) {
    return (
      <>
        <FAQCard open={false} handleChange={setExpanded} isLoading={true} />
        <FAQCard open={false} handleChange={setExpanded} isLoading={true} />
        <FAQCard open={false} handleChange={setExpanded} isLoading={true} />
        <FAQCard open={false} handleChange={setExpanded} isLoading={true} />
      </>
    );
  }

  if (isError) {
    return <LoadingDataError refetch={refetch} />;
  }

  return (
    <Permission permission="FAQ.view">
      <Box>
        <Permission permission="FAQ.create">
          <FAQForm
            initialValues={{
              question: "",
              answer: "",
              question_ar: "",
              answer_ar: "",
            }}
            onSubmit={(values, { resetForm }) => {
              createFaq.mutateAsync(values);
              resetForm();
            }}
            loadingButtonProps={{
              loading: createFaq.isPending,
            }}
          />
          <Divider sx={{ my: 2 }} />
        </Permission>
        <Stack>
          {!isError &&
            data?.data.data.map((faq) => (
              <FAQCard
                faq={faq}
                key={faq.id}
                open={faq.id === expanded}
                handleChange={setExpanded}
                isLoading={false}
              />
            ))}
        </Stack>
      </Box>
    </Permission>
  );
};

export default FAQs;
