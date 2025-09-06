import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../baseRequest";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const useGetGears = ({ page, pageSize, name }) => {
  const { i18n } = useTranslation();

  const getGears = () => {
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
      url: "/admin/gears",
      params,
    });
  };

  const query = useQuery({
    queryKey: ["get-Gears", page, pageSize, name],
    queryFn: getGears,
  });

  return query;
};

export const useCreateGears = () => {
  const { t } = useTranslation();

  const createGears = (data) => {
    return request({
      url: "/admin/gears",
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["create-Gears"],
    mutationFn: createGears,
    onSuccess: () => {
      toast.success(t("response.create"));

      queryClient.refetchQueries({
        queryKey: ["get-Gears"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};

export const useDeleteGears = () => {
  const { t } = useTranslation();

  const deleteGears = (id) => {
    return request({
      url: `/admin/gears/${id}`,
      method: "delete",
    });
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["delete-Gears"],
    mutationFn: deleteGears,
    onSuccess: () => {
      toast.success(t("response.delete"));
      queryClient.refetchQueries({
        queryKey: ["get-Gearss"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};

export const useUpdateGears = () => {
  const { t } = useTranslation();

  const updateGears = ({ data, id }) => {
    return request({
      url: `/admin/gears/${id}`,
      method: "post",
      data,
    });
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["update-Gears"],
    mutationFn: updateGears,
    onSuccess: () => {
      toast.success(t("response.update"));

      queryClient.refetchQueries({
        queryKey: ["get-Gears"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};
