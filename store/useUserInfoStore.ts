import { create } from "zustand";

import { UserInfoType } from "@/types/type";

interface UserInfoStoreType {
  userInfo: UserInfoType | null;
  setUserInfo: (data: UserInfoType) => void;
}

export const useUserInfoStore = create<UserInfoStoreType>((set) => ({
  userInfo: null,
  setUserInfo: (data) => set(() => ({ userInfo: data })),
}));
