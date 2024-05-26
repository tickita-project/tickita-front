import styles from "./index.module.scss";

interface UserInfoType {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface TestProps {
  result: UserInfoType;
}

export const getServerSideProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const result = await res.json();

  return {
    props: { result },
  };
};

export default function Test({ result }: TestProps) {
  return (
    <>
      <div className={styles.test}>{`유저 ID: ${result?.userId}`}</div>
      <div>{`ID: ${result?.id}`}</div>
      <div>{`제목: ${result?.title}`}</div>
      <div>{`상태: ${result?.completed}`}</div>
      <div>https 빌드 테스트</div>
    </>
  );
}
