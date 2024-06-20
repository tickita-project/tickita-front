import { useQuery } from "@tanstack/react-query";

import { getAllNotifications } from "@/apis/apis";

export const useGetNotifications = () => {
  const { data } = useQuery({
    queryKey: ["notification"],
    queryFn: () => getAllNotifications(),
  });

  return { data };
};
