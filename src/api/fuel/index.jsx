import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../baseRequest";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const useGetFuels = ({ page, pageSize, name }) => {
  const { i18n } = useTranslation();

  const getFuels = () => {
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
      url: "/admin/fuel-types",
      params,
    });
  };

  const query = useQuery({
    queryKey: ["get-Fuel", page, pageSize, name],
    queryFn: getFuels,
  });

  return query;
};

export const useCreateFuel = () => {
  const { t } = useTranslation();

  const createFuel = (data) => {
    return request({
      url: "/admin/fuel-types",
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["create-Fuel"],
    mutationFn: createFuel,
    onSuccess: () => {
      toast.success(t("response.create"));

      queryClient.refetchQueries({
        queryKey: ["get-Fuel"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};

export const useDeleteFuel = () => {
  const { t } = useTranslation();

  const deleteFuel = (id) => {
    return request({
      url: `/admin/fuel-types/${id}`,
      method: "delete",
    });
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["delete-Fuel"],
    mutationFn: deleteFuel,
    onSuccess: () => {
      toast.success(t("response.delete"));
      queryClient.refetchQueries({
        queryKey: ["get-Fuel"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};

export const useUpdateFuel = () => {
  const { t } = useTranslation();

  const updateFuel = ({ data, id }) => {
    return request({
      url: `/admin/fuel-types/${id}`,
      method: "post",
      data,
    });
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["update-Fuels"],
    mutationFn: updateFuel,
    onSuccess: () => {
      toast.success(t("response.update"));

      queryClient.refetchQueries({
        queryKey: ["get-Fuel"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};
