import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../baseRequest";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

// Get
export const useGetOffers = ({ page, pageSize }) => {
  const getOffers = () => {
    return request({
      url: "/admin/offers",
      params: {
        page: page + 1,
        per_page: pageSize,
      },
    });
  };

  return useQuery({
    queryKey: ["get-offers", page, pageSize],
    queryFn: getOffers,
    keepPreviousData: true,
  });
};

// Create
export const useCreateOffer = () => {
  const { t } = useTranslation();

  const createOffer = (data) => {
    return request({
      url: "/admin/offers",
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["create-offer"],
    mutationFn: createOffer,
    onSuccess: () => {
      toast.success(t("response.create"));

      queryClient.refetchQueries({
        queryKey: ["get-offers"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};

// Delete
export const useDeleteOffer = () => {
  const { t } = useTranslation();

  const deleteOffer = (id) => {
    return request({
      url: `/admin/products/${id}`,
      method: "delete",
    });
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["delete-offer"],
    mutationFn: deleteOffer,
    onSuccess: () => {
      toast.success(t("response.delete"));

      queryClient.refetchQueries({
        queryKey: ["get-offers"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};

// Update
export const useUpdateOffer = () => {
  const { t } = useTranslation();

  const updateOffer = ({ data, id }) => {
    return request({
      url: `/admin/offers/${id}`,
      method: "put",
      data,
    });
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["update-offer"],
    mutationFn: updateOffer,
    onSuccess: () => {
      toast.success(t("response.update"));

      queryClient.refetchQueries({
        queryKey: ["get-offers"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};
