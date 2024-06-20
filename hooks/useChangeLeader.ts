import { useMutation, useQueryClient } from "@tanstack/react-query";

import { changeLeader } from "@/apis/apis";
import { groupKey } from "@/constants/queryKey";

export const useChangeLeader = (crewId: number) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (memberId: number) => changeLeader(crewId, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: groupKey.detail(crewId) });
    },
  });

  return { mutate };
};
