import dayjs from "dayjs";
import "dayjs/locale/ko";

dayjs.locale("ko");

const formatKoreanDateTime = (date: string) => {
  return dayjs(date).format("YY.MM.DD (ddd) HH:mm");
};

export default formatKoreanDateTime;
