import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../baseRequest";
import { toast } from "react-toastify";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";

export const useGetRoles = () => {
  const getRoles = () => {
    return request({
      url: "/admin/roles",
    });
  };

  const query = useQuery({
    queryKey: ["get-roles"],
    queryFn: getRoles,
  });

  return query;
};

export const useShowRole = () => {
  const { id } = useParams();
  const showRole = () => {
    return request({
      url: `/admin/roles/${id}`,
    });
  };

  const query = useQuery({
    queryKey: [`show-role-${id}`],
    queryFn: showRole,
  });

  return query;
};

export const useCreateRole = () => {
  const { t } = useTranslation();

  const createRole = (data) => {
    return request({
      url: "/admin/roles",
      method: "post",
      data,
    });
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["create-role"],
    mutationFn: createRole,
    onSuccess: (res) => {
      toast.success(t("response.create"));

      queryClient.refetchQueries({
        queryKey: ["get-roles"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};

export const useDeleteRole = () => {
  const { t } = useTranslation();

  const deleteRole = (id) => {
    return request({
      url: `/admin/roles/${id}`,
      method: "delete",
    });
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["delete-role"],
    mutationFn: deleteRole,
    onSuccess: () => {
      toast.success(t("response.delete"));

      queryClient.refetchQueries({
        queryKey: ["get-roles"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};

export const useUpdateRole = () => {
  const { t } = useTranslation();

  const updateRole = ({ data, id }) => {
    return request({
      url: `/admin/roles/${id}`,
      method: "put",
      data,
    });
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["update-role"],
    mutationFn: updateRole,
    onSuccess: () => {
      toast.success(t("response.update"));

      queryClient.refetchQueries({
        queryKey: ["get-roles"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};

export const useUpdatePermissions = () => {
  const { t } = useTranslation();

  const updatePermissions = ({ data, id }) => {
    return request({
      url: `/admin/roles/permissions/${id}`,
      method: "put",
      data,
    });
  };

  const { roleId } = useParams();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["update-permissions"],
    mutationFn: updatePermissions,
    onSuccess: () => {
      toast.success(t("response.update"));

      queryClient.refetchQueries({
        queryKey: [`show-role-${roleId}`],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};
