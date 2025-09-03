import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../baseRequest";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Get
export const useGetModels = ({ page, pageSize, name = "", brand_id }) => {
  const { i18n } = useTranslation();

  const params = {
    page: page + 1,
    per_page: pageSize,
    brand_id,
  };
  if (i18n.language === "ar") {
    params.name_ar = name;
  } else {
    params.name = name;
  }
  const getModels = () => {
    return request({
      url: "/admin/models",
      params,
    });
  };

  const query = useQuery({
    queryKey: ["get-models", page, pageSize, name, brand_id],
    queryFn: getModels,
  });

  return query;
};

// Create
export const useCreateModel = () => {
  const { t } = useTranslation();

  const createModel = (data) => {
    return request({
      url: "/admin/models",
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
    mutationKey: ["create-model"],
    mutationFn: createModel,
    onSuccess: () => {
      toast.success(t("response.create"));
      navigate("/admin/dashboard/models");
      queryClient.refetchQueries({
        queryKey: ["get-models"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};

// Delete
export const useDeleteModel = () => {
  const { t } = useTranslation();

  const deleteModel = (id) => {
    return request({
      url: `/admin/models/${id}`,
      method: "delete",
    });
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["delete-model"],
    mutationFn: deleteModel,
    onSuccess: () => {
      toast.success(t("response.delete"));

      queryClient.refetchQueries({
        queryKey: ["get-models"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};

// Update
export const useUpdateModel = () => {
  const { t } = useTranslation();

  const updateModel = ({ data, id }) => {
    return request({
      url: `/admin/models/${id}`,
      method: "put",
      data,
    });
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["update-model"],
    mutationFn: updateModel,
    onSuccess: () => {
      toast.success(t("response.update"));

      queryClient.refetchQueries({
        queryKey: ["get-models"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};
