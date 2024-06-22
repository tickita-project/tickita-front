import dayjs from "dayjs";
import "dayjs/locale/ko";

dayjs.locale("ko");

export const formatKoreanDateTime = (date: string) => {
  return dayjs(date).format("YY.MM.DD (dd) HH:mm");
};

export const formatKoreanDate = (date: string) => {
  return dayjs(date).format("YY.MM.DD (dd)");
};
