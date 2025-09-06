import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../baseRequest";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const useGetColors = ({ page, pageSize, name }) => {
  const { i18n } = useTranslation();

  const getColors = () => {
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
      url: "/admin/colors",
      params,
    });
  };

  const query = useQuery({
    queryKey: ["get-Color", page, pageSize, name],
    queryFn: getColors,
  });

  return query;
};

export const useCreateColor = () => {
  const { t } = useTranslation();

  const createColor = (data) => {
    return request({
      url: "/admin/colors",
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
    mutationFn: createColor,
    onSuccess: () => {
      toast.success(t("response.create"));

      queryClient.refetchQueries({
        queryKey: ["get-Color"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};

export const useDeleteColor = () => {
  const { t } = useTranslation();

  const deleteColor = (id) => {
    return request({
      url: `/admin/colors/${id}`,
      method: "delete",
    });
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["delete-Color"],
    mutationFn: deleteColor,
    onSuccess: () => {
      toast.success(t("response.delete"));
      queryClient.refetchQueries({
        queryKey: ["get-Color"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};

export const useUpdateColor = () => {
  const { t } = useTranslation();

  const updateColor = ({ data, id }) => {
    return request({
      url: `/admin/colors/${id}`,
      method: "post",
      data,
    });
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["update-Colors"],
    mutationFn: updateColor,
    onSuccess: () => {
      toast.success(t("response.update"));

      queryClient.refetchQueries({
        queryKey: ["get-Color"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};
