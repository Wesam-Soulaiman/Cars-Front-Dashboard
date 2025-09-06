import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../baseRequest";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Getstructures
export const useGetStructures = ({ page, pageSize, name = "" }) => {
  const { i18n } = useTranslation();

  const getStructures = () => {
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
      url: "/admin/structures",
      params,
    });
  };

  const query = useQuery({
    queryKey: ["get-structures", page, pageSize, name],
    queryFn: getStructures,
  });

  return query;
};

// Create
export const useCreateStructures = () => {
  const { t } = useTranslation();

  const createStructures = (data) => {
    return request({
      url: "/admin/structures",
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
    mutationKey: ["create-structures"],
    mutationFn: createStructures,
    onSuccess: () => {
      toast.success(t("response.create"));
      navigate("/admin/dashboard/cars/structures");
      queryClient.refetchQueries({
        queryKey: ["get-structures"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};

// Delete
export const useDeleteStructures = () => {
  const { t } = useTranslation();

  const deleteStructures = (id) => {
    return request({
      url: `/admin/structures/${id}`,
      method: "delete",
    });
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["delete-structures"],
    mutationFn: deleteStructures,
    onSuccess: () => {
      toast.success(t("response.delete"));

      queryClient.refetchQueries({
        queryKey: ["get-structures"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};

// Update
export const useUpdateStructures = () => {
  const { t } = useTranslation();

  const updateStructures = ({ data, id }) => {
    return request({
      url: `/admin/structures/${id}`,
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["update-structures"],
    mutationFn: updateStructures,
    onSuccess: () => {
      toast.success(t("response.update"));

      queryClient.refetchQueries({
        queryKey: ["get-structures"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};
