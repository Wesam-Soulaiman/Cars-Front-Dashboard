import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../baseRequest";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const useGetCarPartCategories = ({ page, pageSize, name }) => {
  const { i18n } = useTranslation();

  const getCarPartCategories = () => {
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
      url: "/admin/car-part-categories",
      params,
    });
  };

  const query = useQuery({
    queryKey: ["get-car-part-categories", page, pageSize, name],
    queryFn: getCarPartCategories,
  });

  return query;
};

export const useCreateCarPartCategories = () => {
  const { t } = useTranslation();

  const createCarPartCategories = (data) => {
    return request({
      url: "/admin/car-part-categories",
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["create-car-part-categories"],
    mutationFn: createCarPartCategories,
    onSuccess: () => {
      toast.success(t("response.create"));

      queryClient.refetchQueries({
        queryKey: ["get-car-part-categories"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};

export const useDeleteCarPartCategories = () => {
  const { t } = useTranslation();

  const deleteCarPartCategories = (id) => {
    return request({
      url: `/admin/car-part-categories/${id}`,
      method: "delete",
    });
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["delete-car-part-categories"],
    mutationFn: deleteCarPartCategories,
    onSuccess: () => {
      toast.success(t("response.delete"));
      queryClient.refetchQueries({
        queryKey: ["get-car-part-categories"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};

export const useUpdateCarPartCategories = () => {
  const { t } = useTranslation();

  const updateCarPartCategories = ({ data, id }) => {
    return request({
      url: `/admin/car-part-categories/${id}`,
      method: "post",
      data,
    });
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["update-car-part-categories"],
    mutationFn: updateCarPartCategories,
    onSuccess: () => {
      toast.success(t("response.update"));

      queryClient.refetchQueries({
        queryKey: ["get-car-part-categories"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};
