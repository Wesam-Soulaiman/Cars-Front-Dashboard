import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../baseRequest";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const useGetSubscription = ({
  page,
  pageSize,
  name,
  service_id,
  store_id,
  active,
  sort_by,
  sort_order,
}) => {
  const { i18n } = useTranslation();

  const getSubscription = () => {
    const params = {
      page: page + 1,
      per_page: pageSize,
      store_id,
      service_id,
      active,
      sort_by,
      sort_order,
    };
    if (i18n.language === "ar") {
      params.name_ar = name;
    } else {
      params.name = name;
    }
    return request({
      url: "/admin/orders",
      params,
    });
  };
  const query = useQuery({
    queryKey: [
      "get-subscription",
      page,
      pageSize,
      name,
      service_id,
      active,
      sort_by,
      sort_order,
      store_id,
    ],
    queryFn: getSubscription,
  });

  return query;
};

export const useCreateSubscription = () => {
  const { t } = useTranslation();

  const createSubscription = (data) => {
    return request({
      url: "/admin/orders",
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });
  };

  const mutation = useMutation({
    mutationKey: ["create-subscription"],
    mutationFn: createSubscription,
    onSuccess: () => {
      toast.success(t("response.create"));
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};

export const useDeleteSubscription = () => {
  const { t } = useTranslation();

  const deleteSubscription = (id) => {
    return request({
      url: `/admin/orders/${id}`,
      method: "delete",
    });
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["delete-subscription"],
    mutationFn: deleteSubscription,
    onSuccess: () => {
      toast.success(t("response.delete"));

      queryClient.refetchQueries({
        queryKey: ["get-subscription"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};

export const useUpdateSubscription = () => {
  const { t } = useTranslation();

  const updateSubscription = ({ data, id }) => {
    return request({
      url: `/admin/orders/${id}`,
      method: "put",
      data,
    });
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["update-subscription"],
    mutationFn: updateSubscription,
    onSuccess: () => {
      toast.success(t("response.update"));

      queryClient.refetchQueries({
        queryKey: ["get-subscription"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};
