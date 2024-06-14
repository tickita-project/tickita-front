export const getErrorMessage = (status: number) => {
  switch (status) {
    case 400:
      return {
        title: "올바르지 않은 요청입니다.",
        content: "입력한 정보를 확인하고 다시 시도해 주세요.",
      };
    case 401:
      return {
        title: "인증에 실패하였습니다.",
        content: "로그인 정보를 확인하고 다시 로그인해 주세요.",
      };
    case 403:
      return {
        title: "접근 권한이 없습니다.",
        content: "해당 페이지에 접근할 수 있는 권한이 없습니다.",
      };
    case 404:
      return {
        title: "요청하신 API 엔드포인트를 찾을 수 없습니다.",
        content: "요청한 API 엔드포인트를 확인해 주세요.",
      };
    case 408:
      return {
        title: "요청 시간이 초과되었습니다.",
        content: "네트워크 상태를 확인하고 다시 시도해 주세요.",
      };
    case 409:
      return {
        title: "서버 충돌이 발생하였습니다.",
        content: "요청이 서버 데이터와 충돌이 발생했습니다. 다시 시도해 주세요.",
      };
    case 429:
      return {
        title: "너무 많은 요청이 발생하였습니다.",
        content: "잠시 후 다시 시도해 주세요.",
      };
    case 500:
      return {
        title: "서버 요청 중 에러가 발생하였습니다.",
        content: "새로고침을 하거나 잠시 후 다시 접속해 주시기 바랍니다.",
      };
    default:
      return {
        title: "서비스에 접속할 수 없습니다.",
        content: "새로고침을 하거나 잠시 후 다시 접속해 주시기 바랍니다.",
      };
  }
};
