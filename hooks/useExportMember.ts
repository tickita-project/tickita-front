import { useMutation, useQueryClient } from "@tanstack/react-query";

import { exportMember } from "@/apis/apis";
import { groupKey } from "@/constants/queryKey";

export const useExportMember = (crewId: number) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (memberId: number) => exportMember(crewId, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: groupKey.detail(crewId) });
    },
  });

  return { mutate };
};
