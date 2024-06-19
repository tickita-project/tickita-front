import { InviteDataType } from "@/pages/group/[id]/components/InviteForm";

import {
  ProfileSetupType,
  CreateGroupDataType,
  GroupType,
  UserInfoType,
  GroupInfoType,
  SchedulePostDataType,
} from "@/types/type";

import { imageRequestInstance, instance } from "./axios";

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

export const postProfileImageUrl = async (data: FormData) => {
  const res = await imageRequestInstance.post("/account-info/img", data);
  return res.data;
};

export const inviteGroupMember = async (data: InviteDataType) => {
  const res = await instance.post(`/mail/send/${data.crewId}`, { email: data.email });
  return res.data;
};

export const getGroupInfo = async (id: number): Promise<GroupInfoType> => {
  const res = await instance.get(`/crew/${id}`);
  return res.data;
};

export const postSchedule = async (data: SchedulePostDataType) => {
  const res = await instance.post(`/schedule`, data);
  return res.data;
};
