import { useMutation, useQueryClient } from "@tanstack/react-query";

import { cancelInvite } from "@/apis/apis";
import { groupKey } from "@/constants/queryKey";

import { CancelInviteType } from "@/types/type";

export const useCancelInvite = (crewId: number) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (data: CancelInviteType) => cancelInvite(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: groupKey.detail(crewId) });
    },
  });

  return { mutate };
};
