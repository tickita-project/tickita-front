import { QueryClient, useMutation } from "@tanstack/react-query";

import { createGroup } from "@/apis/apis";
import { groupKey } from "@/constants/queryKey";

export const useCreateGroup = (queryClient: QueryClient) => {
  const { mutate, isPending } = useMutation({
    mutationFn: createGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: groupKey.all });
    },
  });

  return { mutate, isPending };
};
