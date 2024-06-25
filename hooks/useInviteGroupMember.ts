import { useMutation, useQueryClient } from "@tanstack/react-query";

import { inviteGroupMember } from "@/apis/apis";
import { groupKey } from "@/constants/queryKey";
import { InviteDataType } from "@/pages/group/[id]/components/InviteForm";

export const useInviteGroupMember = (crewId: number) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (data: InviteDataType) => inviteGroupMember(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: groupKey.detail(crewId) });
    },
  });

  return { mutate };
};
