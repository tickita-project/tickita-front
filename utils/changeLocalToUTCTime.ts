const changeLocalToUTCTime = (tokenExpireAt: string) => {
  const localData = new Date(tokenExpireAt);
  const UTCDate = new Date(localData.getTime() - localData.getTimezoneOffset() * 60000);

  return UTCDate.toUTCString();
};

export default changeLocalToUTCTime;
