import { useMutation, useQueryClient } from "@tanstack/react-query";

import { exitGroup } from "@/apis/apis";
import { groupKey } from "@/constants/queryKey";

export const useExitGroup = (crewId: number) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: () => exitGroup(crewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: groupKey.lists() });
    },
  });

  return { mutate };
};
