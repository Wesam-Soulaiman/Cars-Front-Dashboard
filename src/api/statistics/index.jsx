import { useQuery } from "@tanstack/react-query";
import { request } from "../baseRequest";

// Get
export const useGetStatistics = () => {
  const getStatistics = () => {
    return request({
      url: "/admin/statistics",
    });
  };

  const query = useQuery({
    queryKey: ["get-statistics"],
    queryFn: getStatistics,
  });

  return query;
};
