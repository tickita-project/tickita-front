import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteNotification } from "@/apis/apis";
import { notificationKey } from "@/constants/queryKey";

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (notificationId: number) => deleteNotification(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKey.lists() });
    },
  });

  return { mutate };
};
