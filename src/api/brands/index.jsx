import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../baseRequest";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Get
export const useGetBrands = ({ page, pageSize, name = "" }) => {
  const { i18n } = useTranslation();

  const getBrands = () => {
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
      url: "/admin/brands",
      params,
    });
  };

  const query = useQuery({
    queryKey: ["get-brands", page, pageSize, name],
    queryFn: getBrands,
  });

  return query;
};

// Create
export const useCreateBrand = () => {
  const { t } = useTranslation();

  const createBrand = (data) => {
    return request({
      url: "/admin/brands",
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });
  };

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: ["create-brand"],
    mutationFn: createBrand,
    onSuccess: () => {
      toast.success(t("response.create"));
      navigate("/admin/dashboard/brands");
      queryClient.refetchQueries({
        queryKey: ["get-brands"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};

// Delete
export const useDeleteBrand = () => {
  const { t } = useTranslation();

  const deleteBrand = (id) => {
    return request({
      url: `/admin/brands/${id}`,
      method: "delete",
    });
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["delete-brand"],
    mutationFn: deleteBrand,
    onSuccess: () => {
      toast.success(t("response.delete"));

      queryClient.refetchQueries({
        queryKey: ["get-brands"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};

// Update
export const useUpdateBrand = () => {
  const { t } = useTranslation();

  const updateBrand = ({ data, id }) => {
    return request({
      url: `/admin/brands/${id}`,
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["update-brand"],
    mutationFn: updateBrand,
    onSuccess: () => {
      toast.success(t("response.update"));

      queryClient.refetchQueries({
        queryKey: ["get-brands"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};
