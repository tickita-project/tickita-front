import { useQuery } from "@tanstack/react-query";

import { getVoteInfo } from "@/apis/apis";

export const useGetVote = (crewId: number | undefined, voteSubjectId: number) => {
  const { data } = useQuery({
    queryKey: ["voteInfo", crewId, voteSubjectId],
    queryFn: () => getVoteInfo(crewId as number, voteSubjectId),
    enabled: crewId !== undefined && voteSubjectId !== undefined,
  });

  return { data };
};
