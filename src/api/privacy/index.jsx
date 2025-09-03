import { useMutation, useQuery } from "@tanstack/react-query";
import { request } from "../baseRequest";
import { toast } from "react-toastify";

export const useGetPrivacy = () => {
  const getPrivacy = () => {
    return request({
      url: "/admin/privacy-policy",
    });
  };

  const query = useQuery({
    queryKey: ["get-privacy"],
    queryFn: getPrivacy,
  });

  return query;
};

export const useUpdatePrivacy = () => {
  const updatePrivacy = (data) => {
    return request({
      url: "/admin/privacy-policy",
      method: "put",
      data,
    });
  };

  const mutation = useMutation({
    mutationKey: ["update-privacy"],
    mutationFn: updatePrivacy,
    onSuccess: (res) => {
      toast(res.data.message);
    },
    onError: (err) => {
      toast(err.response?.data.message);
    },
  });

  return mutation;
};
