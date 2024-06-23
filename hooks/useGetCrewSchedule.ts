import { useQuery } from "@tanstack/react-query";

import { getCrewSchedules } from "@/apis/apis";
import { scheduleKey } from "@/constants/queryKey";

export default function useGetCrewSchedule(crewId: number, startDate: string, endDate: string) {
  const filter = {
    crewId: crewId,
    startDate: startDate,
    endDate: endDate,
  };
  const { data, refetch } = useQuery({
    queryKey: scheduleKey.list(filter),
    queryFn: () => getCrewSchedules(crewId, startDate, endDate),
    enabled: false,
  });
  return { data, refetch };
}
