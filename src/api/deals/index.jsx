import { useTranslation } from "react-i18next";
import { request } from "../baseRequest";
import { useQuery } from "@tanstack/react-query";

export const useGetDeals = ({ page, pageSize, name }) => {
  const { i18n } = useTranslation();

  const getDeals = () => {
    const params = {
      page: page + 1,
      per_page: pageSize,
    };
    if (i18n.language === "ar") {
      params.name_ar = name;
    } else {
      params.name = name;
    }
    return request({
      url: "/admin/deals",
      params,
    });
  };

  const query = useQuery({
    queryKey: ["get-deals", page, pageSize, name],
    queryFn: getDeals,
  });

  return query;
};
