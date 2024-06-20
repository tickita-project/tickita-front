import { InviteDataType } from "@/pages/group/[id]/components/InviteForm";

import {
  ProfileSetupType,
  CreateGroupDataType,
  GroupType,
  UserInfoType,
  GroupInfoType,
  CancelInviteType,
  AcceptInviteType,
  NotifactionType,
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

export const getGroupInfo = async (crewId: number): Promise<GroupInfoType> => {
  const res = await instance.get(`/crew/${crewId}`);
  return res.data;
};

export const editGroupInfo = async (crewId: number, data: CreateGroupDataType) => {
  const res = await instance.put(`/crew/info/${crewId}`, data);
  return res.data;
};

export const deleteGroup = async (crewId: number) => {
  const res = await instance.delete(`/crew/${crewId}`);
  return res.data;
};

export const exitGroup = async (crewId: number) => {
  const res = await instance.delete(`/crew/leave/${crewId}`);
  return res.data;
};

export const changeLeader = async (crewId: number, memberId: number) => {
  const res = await instance.put(`/crew/delegate-owner/${crewId}?memberId=${memberId}`);
  return res.data;
};

export const exportMember = async (crewId: number, memberId: number) => {
  const res = await instance.put(`/crew/remove-member/${crewId}/${memberId}`);
  return res.data;
};

export const putUserInfo = async (data: ProfileSetupType): Promise<UserInfoType> => {
  const res = await instance.put(`/account-info/${data.accountId}`, data);
  return res.data;
};

export const getAllNotification = async (): Promise<NotifactionType> => {
  const res = await instance.get("/notification");
  return res.data;
};

export const cancelInvite = async (data: CancelInviteType) => {
  const res = await instance.delete("/notification");
};

export const acceptInvite = async (data: AcceptInviteType) => {
  const res = await instance.post(`/notification`, data);
  return res.data;
};
