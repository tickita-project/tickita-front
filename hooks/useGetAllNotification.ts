import { useQuery } from "@tanstack/react-query";

import { getAllNotification } from "@/apis/apis";
import { notificationKey } from "@/constants/queryKey";

export const useGetAllNotification = () => {
  const { data } = useQuery({
    queryKey: notificationKey.lists(),
    queryFn: getAllNotification,
    refetchInterval: 1000 * 60 * 5, // 5분
  });

  return { data };
};
