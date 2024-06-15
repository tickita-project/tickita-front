import { useMutation, useQueryClient } from "@tanstack/react-query";

import { inviteGroupMember } from "@/apis/apis";
import { groupKey } from "@/constants/queryKey";
import { InviteDataType } from "@/pages/group/[id]/components/InviteForm";

export const useInviteGroupMember = (crewId: number) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (data: InviteDataType) => inviteGroupMember(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: groupKey.detail(crewId) }); // 추후에 초대한 계정 리스트 쿼리키 무효화 현재는 api가 없음
    },
  });

  return { mutate };
};
