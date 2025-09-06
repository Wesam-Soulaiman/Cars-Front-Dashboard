import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../baseRequest";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const useGetLights = ({ page, pageSize, name }) => {
  const { i18n } = useTranslation();

  const getLights = () => {
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
      url: "/admin/lights",
      params,
    });
  };

  const query = useQuery({
    queryKey: ["get-Light", page, pageSize, name],
    queryFn: getLights,
  });

  return query;
};

export const useCreateLight = () => {
  const { t } = useTranslation();

  const createLight = (data) => {
    return request({
      url: "/admin/lights",
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["create-Light"],
    mutationFn: createLight,
    onSuccess: () => {
      toast.success(t("response.create"));

      queryClient.refetchQueries({
        queryKey: ["get-Light"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};

export const useDeleteLight = () => {
  const { t } = useTranslation();

  const deleteLight = (id) => {
    return request({
      url: `/admin/lights/${id}`,
      method: "delete",
    });
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["delete-Light"],
    mutationFn: deleteLight,
    onSuccess: () => {
      toast.success(t("response.delete"));
      queryClient.refetchQueries({
        queryKey: ["get-Light"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};

export const useUpdateLight = () => {
  const { t } = useTranslation();

  const updateLight = ({ data, id }) => {
    return request({
      url: `/admin/lights/${id}`,
      method: "post",
      data,
    });
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["update-Lights"],
    mutationFn: updateLight,
    onSuccess: () => {
      toast.success(t("response.update"));

      queryClient.refetchQueries({
        queryKey: ["get-Light"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};
