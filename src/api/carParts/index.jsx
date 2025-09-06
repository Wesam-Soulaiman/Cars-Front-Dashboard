import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../baseRequest";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Get
// Get
export const useGetCarParts = ({
  page,
  pageSize,
  brand_id,
  model_id,
  category_id,
  search,
}) => {
  const getCarParts = () => {
    const params = {
      page: page + 1,
      per_page: pageSize,
      category_id,
      model_id,
      brand_id,
      search, // ✅ add global search
    };
    return request({
      url: "/admin/car-part",
      params,
    });
  };

  const query = useQuery({
    queryKey: [
      "get-car-part",
      page,
      pageSize,
      brand_id,
      model_id,
      category_id,
      search,
    ],
    queryFn: getCarParts,
    keepPreviousData: true,
  });

  return query;
};

// Create
export const useCreateCarParts = () => {
  const { t } = useTranslation();

  const createCarParts = (data) => {
    return request({
      url: "/admin/car-part",
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
    mutationKey: ["create-car-part"],
    mutationFn: createCarParts,
    onSuccess: () => {
      toast.success(t("response.create"));
      navigate("/admin/dashboard/cars/parts");
      queryClient.refetchQueries({
        queryKey: ["get-car-part"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};

// Delete
export const useDeleteCarParts = () => {
  const { t } = useTranslation();

  const deleteCarParts = (id) => {
    return request({
      url: `/admin/car-part/${id}`,
      method: "delete",
    });
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["delete-car-part"],
    mutationFn: deleteCarParts,
    onSuccess: () => {
      toast.success(t("response.delete"));

      queryClient.refetchQueries({
        queryKey: ["get-car-part"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};

// Update
export const useUpdateCarParts = () => {
  const { t } = useTranslation();

  const updateCarParts = ({ data, id }) => {
    return request({
      url: `/admin/car-part/${id}`,
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["update-car-part"],
    mutationFn: updateCarParts,
    onSuccess: () => {
      toast.success(t("response.update"));

      queryClient.refetchQueries({
        queryKey: ["get-car-part"],
      });
    },
    onError: () => {
      toast.error(t("response.wrong"));
    },
  });

  return mutation;
};
