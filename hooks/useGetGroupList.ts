import { useQuery } from "@tanstack/react-query";

import { getGroupList } from "@/apis/apis";
import { groupKey } from "@/constants/queryKey";

export const useGetGroupList = () => {
  const { data, isError } = useQuery({ queryKey: groupKey.all, queryFn: getGroupList });

  return { data, isError };
};
