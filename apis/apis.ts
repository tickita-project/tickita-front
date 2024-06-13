import { ProfileSetupType, CreateGroupDataType, GroupType, UserInfoType } from "@/types/type";

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
    throw new Error(error.response.data.message);
  }
};

export const getGroupList = async (): Promise<Omit<GroupType[], "accountId">> => {
  try {
    const response = await instance.get("/crew/all-info");
    return response.data.crewAllInfos;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const getUserInfo = async (): Promise<UserInfoType> => {
  try {
    const response = await instance.get("/account-info/all");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
