import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteGroup } from "@/apis/apis";
import { groupKey } from "@/constants/queryKey";

export const useDeleteGroup = (crewId: number) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: () => deleteGroup(crewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: groupKey.lists() });
    },
  });

  return { mutate };
};
