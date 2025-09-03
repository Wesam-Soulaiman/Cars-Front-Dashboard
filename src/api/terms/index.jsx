import { useMutation, useQuery } from "@tanstack/react-query";
import { request } from "../baseRequest";
import { toast } from "react-toastify";

export const useGetTerms = () => {
  const getTerms = () => {
    return request({
      url: "/admin/terms-and-conditions",
    });
  };

  return useQuery({
    queryKey: ["get-terms-and-conditions"],
    queryFn: getTerms,
  });
};

export const useUpdateTerms = () => {
  const updateTerms = (data) => {
    return request({
      url: "/admin/terms-and-conditions",
      method: "put",
      data,
    });
  };

  return useMutation({
    mutationKey: ["update-privacy-and-conditions"],
    mutationFn: updateTerms,
    onSuccess: (res) => {
      toast(res.data.message);
    },
    onError: (err) => {
      toast(err.response?.data.message);
    },
  });
};
