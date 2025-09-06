import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../baseRequest";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const useGetStoreType = ({ page, pageSize, name }) => {
  const { i18n } = useTranslation();

  const getStoreType = () => {
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
      url: "/admin/store-types",
      params,
    });
  };

  const query = useQuery({
    queryKey: ["get-store-types", page, pageSize, name],
    queryFn: getStoreType,
  });

  return query;
};

export const useCreateStoreType = () => {
  const { t } = useTranslation();

  const createStoreType = (data) => {
    return request({
      url: "/admin/store-types",
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["create-store-types"],
    mutationFn: createStoreType,
    onSuccess: () => {
      toast.success(t("response.create"));

      queryClient.refetchQueries({
        queryKey: ["get-store-types"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};

export const useDeleteStoreType = () => {
  const { t } = useTranslation();

  const deleteStoreType = (id) => {
    return request({
      url: `/admin/store-types/${id}`,
      method: "delete",
    });
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["delete-store-types"],
    mutationFn: deleteStoreType,
    onSuccess: () => {
      toast.success(t("response.delete"));
      queryClient.refetchQueries({
        queryKey: ["get-store-types"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};

export const useUpdateStoreType = () => {
  const { t } = useTranslation();

  const updateStoreType = ({ data, id }) => {
    return request({
      url: `/admin/store-types/${id}`,
      method: "post",
      data,
    });
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["update-store-types"],
    mutationFn: updateStoreType,
    onSuccess: () => {
      toast.success(t("response.update"));

      queryClient.refetchQueries({
        queryKey: ["get-store-types"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};
