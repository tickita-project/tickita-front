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

export type CookieNameType = "ACCESS_TOKEN" | "REFRESH_TOKEN";

export interface UserInfoType {
  accountId: number;
  nickName: string;
  email: string;
  image: string | null;
  phoneNumber: string | null;
}

export interface ProfileSetupType {
  accountId: number;
  nickName: string;
  phoneNumber: string | null;
  imgUrl: string | null;
}

export interface CreateGroupDataType {
  crewName: string;
  labelColor: GroupColorType;
}

export interface GroupType {
  accountId: number;
  crewName: string;
  labelColor: GroupColorType;
  crewId: number;
}

export type CalendarType = "월" | "주" | "일";

export interface GroupMemberInfoType {
  role: string;
  accountId: number;
  nickName: string;
  email: string;
  imageUrl: string | null;
}

export interface GroupInfoType {
  crewId: number;
  crewName: string;
  labelColor: GroupColorType;
  crewMembers: GroupMemberInfoType[];
  waitingMembers: InviteeType[];
}

export interface ParticipantType {
  accountId: number;
  nickName: string;
}

export interface SchedulePostDataType {
  title: string;
  startDateTime: string;
  endDateTime: string;
  location: string;
  description: string;
  crewId: number;
  participants: ParticipantType[];
}

export interface InviteeType {
  notificationId: number;
  accountId: number;
  nickName: string;
  email: string;
}

export interface CancelInviteType {
  crewId: number;
  accountId: number;
  notificationId: number;
  crewAccept: "DECLINE";
}
export interface VoteNotificationType {
  notificationId: number;
  notificationType: string;
  crewId: number;
  accountId: number;
  crewName: string;
  localDateTime: string;
  isChecked: boolean;
  voteId: number;
  voteTitle: string;
  voteParticipateType: boolean;
}
