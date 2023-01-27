import Home from "lib/pages/home";
import {
  getDaliyTotalInfo,
  getDayInfo,
  getDailyPrecipitation,
  getDailyTemperature,
  getRainToNotRainRatio,
} from "lib/requests/home";
export async function getStaticProps() {
  const [
    daliyTotalInfo,
    dayInfo,
    dailyPrecipitation,
    dailyTemperature,
    rainToNotRainRatio,
  ] = await Promise.all([
    getDaliyTotalInfo(),
    getDayInfo(),
    getDailyPrecipitation(),
    getDailyTemperature(),
    getRainToNotRainRatio(),
  ]);
  return {
    props: {
      daliyTotalInfo,
      dayInfo,
      dailyPrecipitation,
      dailyTemperature,
      rainToNotRainRatio,
    },
    revalidate: 10 * 60,
  };
}
export default Home;
export type HomeType = Pick<
  Awaited<ReturnType<typeof getStaticProps>>,
  "props"
>["props"];
