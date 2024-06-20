import { useMutation, useQueryClient } from "@tanstack/react-query";

import { editGroupInfo } from "@/apis/apis";
import { groupKey } from "@/constants/queryKey";

import { CreateGroupDataType } from "@/types/type";

export const useEditGroupInfo = (crewId: number) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (data: CreateGroupDataType) => editGroupInfo(crewId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: groupKey.detail(crewId) });
      queryClient.invalidateQueries({ queryKey: groupKey.lists() });
    },
  });

  return { mutate };
};
