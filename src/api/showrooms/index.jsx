import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../baseRequest";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useGetTranslation from "../../utils/useGetTranslation";

// Get
export const useGetShowrooms = ({
  page,
  pageSize,
  name = "",
  sort_by,
  sort_order,
}) => {
  const { i18n } = useTranslation();
  const { getTranslation } = useGetTranslation();

  const getShowrooms = () => {
    const params = {
      page: page + 1,
      per_page: pageSize,
      sort_by: getTranslation(sort_by) || "",
      sort_order: sort_order || "",
    };
    if (i18n.language === "ar") {
      params.name_ar = name;
    } else {
      params.name = name;
    }
    return request({
      url: "/admin/stores",
      params,
    });
  };

  return useQuery({
    queryKey: ["get-showrooms", page, pageSize, name, sort_by, sort_order],
    queryFn: getShowrooms,
    keepPreviousData: true,
  });
};

export const useGetShowroomDetails = () => {
  const { id } = useParams();

  const getShowroomDetails = () => {
    return request({
      url: `/admin/stores/${id}`,
    });
  };

  const query = useQuery({
    queryKey: [`get-showroom-details`, id],
    queryFn: getShowroomDetails,
    enabled: !!id,
  });

  return query;
};

export const useDeleteShowroomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const mutation = useMutation({
    mutationFn: () =>
      request({
        url: `/admin/stores/${id}`,
        method: "delete",
      }),
    onSuccess: () => {
      toast.success(t("response.create"));
      navigate("/admin/dashboard/showrooms");
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};

// Create
export const useCreateShowroom = () => {
  const { t } = useTranslation();

  const createShowroom = (data) => {
    return request({
      url: "/admin/stores",
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
    mutationKey: ["create-showroom"],
    mutationFn: createShowroom,
    onSuccess: () => {
      toast.success(t("response.create"));

      navigate("/admin/dashboard/showrooms");
      queryClient.refetchQueries({
        queryKey: ["get-showrooms"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};

// Update
export const useUpdateShowroom = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const updateShowroom = (data) => {
    return request({
      url: `/admin/stores/${id}`,
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["update-showroom"],
    mutationFn: updateShowroom,
    onSuccess: () => {
      toast.success(t("response.update"));

      queryClient.refetchQueries({
        queryKey: ["get-showrooms"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};
