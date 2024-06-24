import { useQuery } from "@tanstack/react-query";

import { getUpcomingSchedule } from "@/apis/apis";
import { scheduleKey } from "@/constants/queryKey";

export const useGetUpcomingSchedule = () => {
  const { data } = useQuery({
    queryKey: scheduleKey.upcoming(),
    queryFn: getUpcomingSchedule,
  });

  return { data };
};
