import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../baseRequest";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const useGetFeatures = ({ page, pageSize, name }) => {
  const { i18n } = useTranslation();

  const getFeatures = () => {
    const params = {
      page: page + 1,
      per_page: pageSize,
    };
    if (i18n.language === "ar") {
      params.name_ar = name;
    } else {
      params.name = name;
    }
    return request({
      url: "/admin/Feature",
      params,
    });
  };

  const query = useQuery({
    queryKey: ["get-Features", page, pageSize, name],
    queryFn: getFeatures,
  });

  return query;
};

export const useCreateFeature = () => {
  const { t } = useTranslation();

  const createFeature = (data) => {
    return request({
      url: "/admin/Feature",
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["create-Feature"],
    mutationFn: createFeature,
    onSuccess: () => {
      toast.success(t("response.create"));

      queryClient.refetchQueries({
        queryKey: ["get-Features"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};

export const useDeleteFeature = () => {
  const { t } = useTranslation();

  const deleteFeature = (id) => {
    return request({
      url: `/admin/Feature/${id}`,
      method: "delete",
    });
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["delete-Feature"],
    mutationFn: deleteFeature,
    onSuccess: () => {
      toast.success(t("response.delete"));
      queryClient.refetchQueries({
        queryKey: ["get-Features"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};

export const useUpdateFeature = () => {
  const { t } = useTranslation();

  const updateFeature = ({ data, id }) => {
    return request({
      url: `/admin/Feature/${id}`,
      method: "put",
      data,
    });
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["update-Features"],
    mutationFn: updateFeature,
    onSuccess: () => {
      toast.success(t("response.update"));

      queryClient.refetchQueries({
        queryKey: ["get-Features"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};
