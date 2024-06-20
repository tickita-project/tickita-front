import dayjs from "dayjs";
import "dayjs/locale/ko";

dayjs.locale("ko");

export const changeLocalTime = (time: string) => {
  return dayjs(time).format("YY.MM.DD (dd)");
};

export const changeLocalFullTime = (time: string) => {
  return dayjs(time).format("YY.MM.DD (dd) HH:MM");
};
