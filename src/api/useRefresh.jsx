import { useMutation } from "@tanstack/react-query";
import { request } from "./baseRequest";
import { Encrypt, Decrypt } from "../utils/encryption";

const useRefresh = () => {
  const refreshTokenAPI = () => {
    const currentToken = localStorage.getItem("cartoken");
    return request({
      url: "/admin/refreshToken",
      method: "post",
      headers: {
        Authorization: `Bearer ${Decrypt(currentToken)}`,
      },
    });
  };

  const mutation = useMutation({
    mutationKey: ["refresh-token"],
    mutationFn: refreshTokenAPI,
    onSuccess: (res) => {
      const { token } = res.data.data;
      localStorage.setItem("cartoken", Encrypt(token));
    },
    onError: (error) => {
      console.error("Token refresh failed:", error);
      localStorage.removeItem("cartoken");
      localStorage.removeItem("User");
    },
  });

  return mutation;
};

export default useRefresh;
