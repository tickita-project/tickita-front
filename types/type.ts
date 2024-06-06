export type GroupColorType =
  | "#FF7940" // orange500
  | "#FF3333" // red500
  | "#D688EA" // purple400
  | "#3360FF" // blue500
  | "#21D53E" // green500
  | "#33DAFF" // sky500
  | "#F380B7" // pink400
  | "#FFB723" // yellow500
  | "#32ECB4" // emelard500
  | "#4F4F4F"; // gray800

export interface UserInfoType {
  id: number;
  nickname: string;
  email: string;
  profileImageUrl: string | null;
  phoneNumber: string | null;
}

export interface ProfileSetupType {
  accountId: number;
  nickname: string;
  phoneNumber: string | null;
}
