import { useQuery } from "@tanstack/react-query";

import { getGroupInfo } from "@/apis/apis";
import { groupKey } from "@/constants/queryKey";

export const useGetGroupInfo = (id: number) => {
  const { data } = useQuery({
    queryKey: groupKey.detail(id),
    queryFn: () => getGroupInfo(id),
  });

  return { data };
};
