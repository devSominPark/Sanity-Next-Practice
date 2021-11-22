import { useRouter } from "next/router";

export default function BlogId() {
  const router = useRouter();

  const { id } = router.query;

  return (
    <div>
      <h1>Blog/{id}</h1>
    </div>
  );
}
