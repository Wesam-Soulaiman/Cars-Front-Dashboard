import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../baseRequest";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Get
export const useGetCars = ({
  page,
  pageSize,
  name = "",
  storeId,
  sort_by,
  sort_order,
}) => {
  const getCars = () => {
    const params = {
      page: page + 1,
      per_page: pageSize,
      sort_by: sort_by,
      sort_order: sort_order,
      storeId: storeId,
      name: name,
    };
    return request({
      url: "/admin/products",
      params,
    });
  };

  return useQuery({
    queryKey: ["get-cars", page, pageSize, name, storeId, sort_by, sort_order],
    queryFn: getCars,
    keepPreviousData: true,
  });
};

export const useGetCarDetails = () => {
  const { id } = useParams();

  const getCarDetails = () => {
    return request({
      url: `/admin/products/${id}`,
    });
  };

  const query = useQuery({
    queryKey: [`get-car-details`, id],
    queryFn: getCarDetails,
    enabled: !!id,
  });

  return query;
};

// Create
export const useCreateCar = () => {
  const { t } = useTranslation();

  const createCar = (data) => {
    return request({
      url: "/admin/products",
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });
  };
  const mutation = useMutation({
    mutationKey: ["create-car"],
    mutationFn: createCar,
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
export const useDeleteCar = () => {
  const { t } = useTranslation();

  const deleteCar = (id) => {
    return request({
      url: `/admin/products/${id}`,
      method: "delete",
    });
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["delete-car"],
    mutationFn: deleteCar,
    onSuccess: () => {
      toast.success(t("response.delete"));
      queryClient.refetchQueries({
        queryKey: ["get-cars"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};

export const useDeleteCarDetails = () => {
  const { t } = useTranslation();

  const { id } = useParams();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: () =>
      request({
        url: `/admin/products/${id}`,
        method: "delete",
      }),
    onSuccess: () => {
      toast.success(t("response.create"));

      navigate("/admin/dashboard/cars");
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};

// Update
export const useUpdateCar = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const updateCar = (data) => {
    return request({
      url: `/admin/products/${id}`,
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["update-car"],
    mutationFn: updateCar,
    onSuccess: () => {
      toast.success(t("response.update"));

      queryClient.refetchQueries({
        queryKey: ["get-cars"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};

export const useDeleteCarPhoto = () => {
  const { t } = useTranslation();

  const deleteCarPhoto = (id) => {
    return request({
      url: `/admin/products/photo/${id}`,
      method: "delete",
    });
  };

  const mutation = useMutation({
    mutationKey: ["delete-car-photo"],
    mutationFn: deleteCarPhoto,
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};
