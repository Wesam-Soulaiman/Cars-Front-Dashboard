import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../baseRequest";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const useGetBanners = () => {
  const getBanners = () => {
    return request({
      url: "/admin/banners",
    });
  };

  const query = useQuery({
    queryKey: ["get-banners"],
    queryFn: getBanners,
  });

  return query;
};

export const useCreateBanner = () => {
  const { t } = useTranslation();

  const createBanner = (data) => {
    return request({
      url: "/admin/banners",
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["create-banner"],
    mutationFn: createBanner,
    onSuccess: () => {
      toast.success(t("response.create"));
      queryClient.refetchQueries({
        queryKey: ["get-banners"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};

export const useDeleteBanner = () => {
  const { t } = useTranslation();

  const deleteBanner = (id) => {
    return request({
      url: `/admin/banners/${id}`,
      method: "delete",
    });
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["delete-banner"],
    mutationFn: deleteBanner,
    onSuccess: () => {
      toast.success(t("response.delete"));
      queryClient.refetchQueries({
        queryKey: ["get-banners"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};

// Update
export const useUpdateBanner = () => {
  const { t } = useTranslation();

  const updateBanner = ({ data, id }) => {
    return request({
      url: `/admin/banners/${id}`,
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["update-banner"],
    mutationFn: updateBanner,
    onSuccess: () => {
      toast.success(t("response.update"));
      queryClient.refetchQueries({
        queryKey: ["get-banners"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};
