import { useEffect } from "react";

import { postSelectVote } from "@/apis/apis";

import { VoteSelectDataType } from "@/types/type";

export const usePostSelectVote = (data: VoteSelectDataType, voteSubjectId: number) => {
  const fetchData = async () => {
    try {
      await postSelectVote(data, voteSubjectId);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data };
};
