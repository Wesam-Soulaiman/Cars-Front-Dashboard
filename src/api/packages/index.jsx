import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../baseRequest";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const useGetPackages = () => {
  const getPackages = () => {
    return request({
      url: "/admin/services",
    });
  };

  const query = useQuery({
    queryKey: ["get-packages"],
    queryFn: getPackages,
  });

  return query;
};

export const useGetCategories = () => {
  const getCategories = () => {
    return request({
      url: "/admin/services/categories",
    });
  };

  const query = useQuery({
    queryKey: ["get-categories"],
    queryFn: getCategories,
  });

  return query;
};

export const useCreatePackages = () => {
  const { t } = useTranslation();

  const createPackages = (data) => {
    return request({
      url: "/admin/services",
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["create-packages"],
    mutationFn: createPackages,
    onSuccess: () => {
      toast.success(t("response.create"));

      queryClient.refetchQueries({
        queryKey: ["get-packages"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};

export const useDeletePackage = () => {
  const { t } = useTranslation();

  const deletePackage = (id) => {
    return request({
      url: `/admin/services/${id}`,
      method: "delete",
    });
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["delete-package"],
    mutationFn: deletePackage,
    onSuccess: () => {
      toast.success(t("response.delete"));

      queryClient.refetchQueries({
        queryKey: ["get-packages"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};

export const useUpdatePackage = () => {
  const { t } = useTranslation();

  const updatePackages = ({ data, id }) => {
    return request({
      url: `/admin/services/${id}`,
      method: "put",
      data,
    });
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["update-packages"],
    mutationFn: updatePackages,
    onSuccess: () => {
      toast.success(t("response.update"));

      queryClient.refetchQueries({
        queryKey: ["get-packages"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};
