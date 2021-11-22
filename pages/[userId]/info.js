import { useRouter } from "next/router";

export default function UserInfo() {
  const router = useRouter();

  const { userId } = router.query;
  return (
    <div>
      <h1>{userId}/info</h1>
    </div>
  );
}
