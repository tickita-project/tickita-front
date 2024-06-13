import { ProfileSetupType, CreateGroupDataType, GroupType } from "@/types/type";

import { imageRequestInstance, instance } from "./axios";

export const postProfileSetup = async (data: ProfileSetupType) => {
  const res = await instance.post("/account-info", data);
  return res.data;
};

export const createGroup = async (data: CreateGroupDataType): Promise<GroupType> => {
  try {
    const response = await instance.post("/crew", data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const getGroupList = async (): Promise<Omit<GroupType[], "accountId">> => {
  try {
    const res = await instance.get("/crew/all-info");
    return res.data.crewAllInfos;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const postProfileImageUrl = async (data: FormData) => {
  const res = await imageRequestInstance.post("/account-info/img", data);
  return res.data;
};
