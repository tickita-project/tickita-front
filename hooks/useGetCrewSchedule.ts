import { useQuery } from "@tanstack/react-query";

import { getCrewSchedules } from "@/apis/apis";
import { scheduleKey } from "@/constants/queryKey";

export default function useGetCrewSchedule(crewId: number, startDate: string, endDate: string) {
  const { data } = useQuery({
    queryKey: scheduleKey.lists(crewId),
    queryFn: () => getCrewSchedules(crewId, startDate, endDate),
  });
  return { data };
}
