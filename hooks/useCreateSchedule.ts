import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createSchedule } from "@/apis/apis";
import { scheduleKey } from "@/constants/queryKey";

export const useCreateSchedule = (crewId: number) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: createSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: scheduleKey.lists() });
    },
  });

  return { mutate, isPending };
};
