import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createGroup } from "@/apis/apis";
import { groupKey } from "@/constants/queryKey";

export const useCreateGroup = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: createGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: groupKey.lists() });
    },
  });

  return { mutate, isPending };
};
