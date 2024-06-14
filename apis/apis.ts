import { ProfileSetupType, CreateGroupDataType, GroupType, UserInfoType } from "@/types/type";

import { instance } from "./axios";

export const postProfileSetup = async (data: ProfileSetupType) => {
  const res = await instance.post("/account-info", data);
  return res.data;
};

export const createGroup = async (data: CreateGroupDataType): Promise<GroupType> => {
  const response = await instance.post("/crew", data);
  return response.data;
};

export const getGroupList = async (): Promise<Omit<GroupType[], "accountId">> => {
  const response = await instance.get("/crew/all-info");
  return response.data.crewAllInfos;
};

export const getUserInfo = async (): Promise<UserInfoType> => {
  const response = await instance.get("/account-info/all");
  return response.data;
};
