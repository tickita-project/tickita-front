export type GroupColorType =
  | "#FF7940"
  | "#ff3333"
  | "#D688EA"
  | "#3360FF"
  | "#21D53E"
  | "#33DAFF"
  | "#4F4F4F"
  | "#F380B7"
  | "#FFB723"
  | "#32ECB4";

export interface UserInfoType {
  id: number;
  nickname: string;
  email: string;
  profileImageUrl: string | null;
  phoneNumber: string | null;
}
