import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import styles from "./index.module.scss";

interface UserInfoType {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const fetchTodo = async (): Promise<UserInfoType> => {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    if (!res.ok) {
      throw new Error("ㅇ_ㅇ");
    }
    return res.json();
  } catch (e: any) {
    throw new Error(e);
  }
};

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["todos", "1"],
    queryFn: fetchTodo,
  });

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};

export default function Test() {
  const { data } = useQuery({ queryKey: ["todos", "1"], queryFn: fetchTodo });

  return (
    <>
      <div className={styles.test}>{`유저 ID: ${data?.userId}`}</div>
      <div>{`ID: ${data?.id}`}</div>
      <div>{`제목: ${data?.title}`}</div>
      <div>{`상태: ${data?.completed}`}</div>
    </>
  );
}
