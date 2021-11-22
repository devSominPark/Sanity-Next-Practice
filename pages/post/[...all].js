import { useRouter } from "next/router";

export default function PostAll() {
  const router = useRouter();

  const { all } = router.query;

  return (
    <div>{all !== undefined ? <h1>PostAll/{all.join("/")}</h1> : null}</div>
  );
}
