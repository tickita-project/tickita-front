import { useMutation, useQueryClient } from "@tanstack/react-query";

import { acceptInvite } from "@/apis/apis";
import { groupKey, notificationKey } from "@/constants/queryKey";

import { AcceptInviteType } from "@/types/type";

export const useAcceptInvite = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (data: AcceptInviteType) => acceptInvite(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: groupKey.lists() });
      queryClient.invalidateQueries({ queryKey: notificationKey.lists() });
    },
  });

  return { mutate };
};
