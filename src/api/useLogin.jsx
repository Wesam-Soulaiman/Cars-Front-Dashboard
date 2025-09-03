import { useMutation } from "@tanstack/react-query";
import { request } from "./baseRequest";
import { Encrypt } from "../utils/encryption";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
// import { homepageMap } from "../router/homepageMap";

const useLogin = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const login = (data) => {
    return request({
      url: "/admin/auth/login",
      method: "post",
      data,
    });
  };

  const mutation = useMutation({
    mutationKey: ["login-user"],
    mutationFn: login,
    onSuccess: (res) => {
      const { token, user, permissions } = res.data.data;
      localStorage.setItem("cartoken", Encrypt(token));
      const payload = JSON.stringify({ user, permissions });
      localStorage.setItem("User", Encrypt(payload));
      toast.success(t("response.login"));
      navigate("/admin/dashboard");
    },
    onError: (err) => {
      if (err.response) {
        toast(err.response.data.message);
      } else {
        toast("An unexpected error occurred.");
      }
    },
  });

  return mutation;
};

export default useLogin;
