import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../baseRequest";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

// Get
export const useGetEmployees = ({ page, pageSize, name, role_id }) => {
  const { i18n } = useTranslation();

  const getEmployees = () => {
    const params = {
      page: page + 1,
      per_page: pageSize,
      role_id,
    };
    if (i18n.language === "ar") {
      params.name_ar = name;
    } else {
      params.name = name;
    }
    return request({
      url: "/admin/employees",
      params,
    });
  };

  return useQuery({
    queryKey: ["get-employees", page, pageSize, name, role_id],
    queryFn: getEmployees,
    keepPreviousData: true,
  });
};

// Create
export const useCreateEmployee = () => {
  const { t } = useTranslation();

  const createEmployee = (data) => {
    return request({
      url: "/admin/employees",
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });
  };

  const mutation = useMutation({
    mutationKey: ["create-employee"],
    mutationFn: createEmployee,
    onSuccess: () => {
      toast.success(t("response.create"));
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};

// Delete
export const useDeleteEmployee = () => {
  const { t } = useTranslation();

  const deleteEmployee = (id) => {
    return request({
      url: `/admin/employees/${id}`,
      method: "delete",
    });
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["delete-employee"],
    mutationFn: deleteEmployee,
    onSuccess: () => {
      toast.success(t("response.delete"));

      queryClient.refetchQueries({
        queryKey: ["get-employees"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};

// Update
export const useUpdateEmployee = () => {
  const { t } = useTranslation();

  const updateEmployee = ({ data, id }) => {
    return request({
      url: `/admin/employees/${id}`,
      method: "put",
      data,
    });
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["update-employee"],
    mutationFn: updateEmployee,
    onSuccess: () => {
      toast.success(t("response.update"));

      queryClient.refetchQueries({
        queryKey: ["get-employees"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};
