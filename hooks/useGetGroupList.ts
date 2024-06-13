import { useQuery } from "@tanstack/react-query";

import { getGroupList } from "@/apis/apis";
import { groupKey } from "@/constants/queryKey";

export const useGetGroupList = () => {
  const { data, isError } = useQuery({ queryKey: groupKey.lists(), queryFn: getGroupList });

  return { data, isError };
};
