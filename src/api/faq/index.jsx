import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../baseRequest";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

// GET FAQs
export const useGetFaqs = ({ page, per_page }) => {
  const getFaqs = () => {
    return request({
      url: "/admin/FAQ",
      params: {
        page,
        per_page,
      },
    });
  };

  const query = useQuery({
    queryKey: ["get-faqs"],
    queryFn: getFaqs,
  });

  return query;
};

// CREATE FAQ
export const useCreateFaq = () => {
  const { t } = useTranslation();

  const createFaq = (data) => {
    return request({
      url: "/admin/FAQ",
      method: "post",
      data,
    });
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["create-faq"],
    mutationFn: createFaq,
    onSuccess: () => {
      toast.success(t("response.create"));
      queryClient.refetchQueries({
        queryKey: ["get-faqs"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};

// DELETE FAQ
export const useDeleteFaq = () => {
  const { t } = useTranslation();

  const deleteFaq = (id) => {
    return request({
      url: `/admin/FAQ/${id}`,
      method: "delete",
    });
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["delete-faq"],
    mutationFn: deleteFaq,
    onSuccess: () => {
      toast.success(t("response.delete"));

      queryClient.refetchQueries({
        queryKey: ["get-faqs"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};

// UPDATE FAQ
export const useUpdateFaq = () => {
  const { t } = useTranslation();

  const updateFaq = ({ data, id }) => {
    return request({
      url: `/admin/FAQ/${id}`,
      method: "put",
      data,
    });
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["update-faq"],
    mutationFn: updateFaq,
    onSuccess: () => {
      toast.success(t("response.update"));

      queryClient.refetchQueries({
        queryKey: ["get-faqs"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};
