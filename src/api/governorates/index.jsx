import { useQuery } from "@tanstack/react-query";
import { request } from "../baseRequest";
import { useTranslation } from "react-i18next";

export const useGetGovernorates = ({ page, pageSize, name = "" }) => {
  const { i18n } = useTranslation();

  const getGovernorates = () => {
    const params = {
      page: page + 1,
      per_page: pageSize,
    };
    if (name !== "") {
      if (i18n.language === "ar") {
        params.name_ar = name;
      } else {
        params.name = name;
      }
    }
    return request({
      url: "/admin/governorates",
      params,
    });
  };

  const query = useQuery({
    queryKey: ["get-governorates", page, pageSize, name],
    queryFn: getGovernorates,
  });

  return query;
};
