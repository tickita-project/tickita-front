import { useQuery } from "@tanstack/react-query";

import { getUserInfo } from "@/apis/apis";
import { userInfoKey } from "@/constants/queryKey";

export const useGetUserInfo = () => {
  const { data } = useQuery({ queryKey: userInfoKey.info(), queryFn: getUserInfo });

  return { data };
};
