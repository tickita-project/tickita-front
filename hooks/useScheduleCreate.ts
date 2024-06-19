import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postSchedule } from "@/apis/apis";
import { scheduleKey } from "@/constants/queryKey";

export const useScheduleCreate = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: postSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: scheduleKey.lists() });
    },
  });

  return { mutate, isPending };
};
