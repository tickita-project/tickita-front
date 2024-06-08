import { useRouter } from "next/router";

import { ProfileSetupType, CreateGroupDataType, GroupType } from "@/types/type";

import { instance } from "./axios";

export const postProfileSetup = async (data: ProfileSetupType) => {
  const res = await instance.post("/account-info", data);
  return res.data;
};

export const createGroup = async (data: CreateGroupDataType): Promise<GroupType> => {
  try {
    const response = await instance.post("/crew", data);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error("그룹 생성에 실패했습니다.");
  }
};
