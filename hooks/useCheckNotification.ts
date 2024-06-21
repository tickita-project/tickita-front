import { useMutation, useQueryClient } from "@tanstack/react-query";

import { checkNotification } from "@/apis/apis";
import { notificationKey } from "@/constants/queryKey";

import { NotificationInfoType, NotificationDataType } from "@/types/type";

export const useCheckNotification = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (notificationId: number) => checkNotification(notificationId),
    onMutate: async (notificationId: number) => {
      // 낙관적 업데이트(Optimistic Update)
      await queryClient.cancelQueries({ queryKey: notificationKey.lists() });

      const prevNotifications = queryClient.getQueryData(notificationKey.lists()); // 이전 값(에러 처리할 때 사용)

      queryClient.setQueryData(notificationKey.lists(), (oldData: NotificationDataType) => {
        return {
          count: oldData.count - 1,
          notificationInfo: oldData.notificationInfo.map((data: NotificationInfoType) => {
            if (data.notificationId === notificationId) {
              // 알림 id가 같으면
              return {
                ...data,
                isChecked: true,
              };
            }
            return data;
          }),
        };
      });

      return { prevNotifications }; // 이전 값을 context에 저장
    },
    onError: (error, data, context) => {
      // 에러가 발생하면  onMutate에서 반환된 context를 사용하여 롤백 진행
      queryClient.setQueryData(notificationKey.lists(), context?.prevNotifications);
    },
    onSettled: () => {
      //   queryClient.invalidateQueries({ queryKey: notificationKey.lists() });
    },
  });

  return { mutate };
};
