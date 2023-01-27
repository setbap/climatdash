import Wind from "lib/pages/wind";
import { getDailyInfo, getTotalWindInfo } from "lib/requests/wind";

export async function getStaticProps() {
  const [totalWindInfo, dailyInfo] = await Promise.all([
    getTotalWindInfo(),
    getDailyInfo(),
  ]);
  return {
    props: {
      totalWindInfo,
      dailyInfo,
    },
    revalidate: 10 * 60,
  };
}
export default Wind;
export type WindType = Pick<
  Awaited<ReturnType<typeof getStaticProps>>,
  "props"
>["props"];
