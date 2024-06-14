import { AxiosError } from "axios";

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
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error?.response?.data.message);
    }
    throw error;
  }
};

export const getGroupList = async (): Promise<Omit<GroupType[], "accountId">> => {
  try {
    const response = await instance.get("/crew/all-info");
    return response.data.crewAllInfos;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error?.response?.data.message);
    }
    throw error;
  }
};

export const getUserInfo = async (): Promise<UserInfoType> => {
  try {
    const response = await instance.get("/account-info/all");
    return response.data;
  } catch (error: any) {
    if (error instanceof AxiosError) {
      throw new Error(error?.response?.data.message);
    }
    throw error;
  }
};
