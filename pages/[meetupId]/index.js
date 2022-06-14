import { useRouter } from "next/router";

const DynamicRoutes = () => {
  const router = useRouter();
  const data = router.query.newsId;
  return <div>DynamicRoutes {data}</div>;
};

export default DynamicRoutes;
