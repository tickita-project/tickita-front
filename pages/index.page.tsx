export const getServerSideProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const result = await res.json();

  return {
    props: { result },
  };
};

export default function Home({ result }: any) {
  return (
    <>
      <div>{`유저 ID: ${result.userId}`}</div>
      <div>{`ID: ${result.id}`}</div>
      <div>{`제목: ${result.title}`}</div>
      <div>{`상태: ${result.completed}`}</div>
      <div>aws 자동화 테스트1</div>
    </>
  );
}
