import { useQuery } from "@tanstack/react-query";
import { request } from "./baseRequest";
import { Decrypt } from "../utils/encryption";

const useGetMyProfile = () => {
  const getMyProfile = () => {
    const currentToken = localStorage.getItem("cartoken");

    return request({
      url: "/user",
      headers: {
        Authorization: `Bearer ${Decrypt(currentToken)}`,
      },
    });
  };

  const query = useQuery({
    queryKey: ["get-me"],
    queryFn: getMyProfile,
  });

  return query;
};

export default useGetMyProfile;
