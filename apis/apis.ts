import { ProfileSetupType } from "@/types/type";

import { imageRequestInstance, instance } from "./axios";

export const postProfileSetup = async (data: ProfileSetupType) => {
  const res = await instance.post("/account-info", data);
  return res.data;
};

export const postProfileImageUrl = async (data: FormData) => {
  const res = await imageRequestInstance.post("/account-info/img", data);
  return res.data;
};
