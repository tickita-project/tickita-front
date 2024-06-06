import { z } from "zod";

export const NICKNAME_SCHEMA = z
  .string()
  .regex(/^[가-히ㄱ-ㅎㅏ-ㅣa-zA-Z]+$/, "특수문자와 숫자를 제외한 2~10자 사이로 입력해주세요")
  .min(2, "2자 이상으로 입력해주세요")
  .max(10, "10자 이하로 입력해주세요");

export const PHONE_NUMBER_SCHEMA = z
  .string()
  .transform((value) => value || null)
  .nullable()
  .refine(
    (value) => !value || (/^010\d{8}$/ && value.length === 11),
    "010 포함 전화번호 11자리를 입력해주세요",
  );
