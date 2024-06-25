import { useEffect, useState } from "react";

import { getDisableTime } from "@/apis/apis";

export const useGetDisableTime = (participantId: number[], selectedDates: string[]) => {
  const [data, setData] = useState<any>(null);

  const fetchData = async () => {
    try {
      const result = await getDisableTime(participantId, selectedDates);

      const { participantTimes } = result;
      setData(participantTimes);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [participantId, selectedDates]);

  return { data };
};
