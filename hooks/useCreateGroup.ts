import { useMutation } from "@tanstack/react-query";

import { createGroup } from "@/apis/apis";

export const useCreateGroup = () => {
  const { mutate, isPending } = useMutation({ mutationFn: createGroup });

  return { mutate, isPending };
};
