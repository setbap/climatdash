import { Box, SimpleGrid } from "@chakra-ui/react";
import ChartBox from "lib/components/charts/LineChart";
import { StatsCard } from "lib/components/charts/StateCard";
import names from "lib/utility/names";
import { NextSeo } from "next-seo";
import { HomeType } from "pages";
import LineChartWithBar from "lib/components/charts/LineChartWithBar";
import HeaderSection from "lib/components/basic/HeaderSection";
import DonutChart from "lib/components/charts/DonutChart";

const colors = [
  "#ff5722",
  "#03a9f4",
  "#ffc107",
  "#4caf50",
  "#00bcd4",
  "#f44336",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#2196f3",
  "#009688",
  "#607d8b",
];

const Home = ({
  daliyTotalInfo,
  dayInfo,
  dailyPrecipitation,
  dailyTemperature,
  rainToNotRainRatio,
}: HomeType): JSX.Element => {
  return (
    <>
      <NextSeo
        title={`Climat | Transactions`}
        description={`Track the latest stats and trends on ${names.BLOCKCHAIN}`}
        openGraph={{
          url: `https://${names.SITE_URL}/`,
          title: `Home`,
          description: `Track the latest stats and trends on ${names.BLOCKCHAIN}`,
          images: [
            {
              url: `https://${names.SITE_URL}/og.png`,
              alt: `${names.APP_NAME} by Flipside Crypto and Setbap`,
            },
          ],
          site_name: `${names.APP_NAME}`,
        }}
        twitter={{
          handle: "@flipsidecrypto",
          cardType: "summary_large_image",
        }}
      />
      <Box mx={"auto"} pt="4" px={{ base: 3, sm: 2, md: 8 }}>
        <HeaderSection title="Climat Transaction">
          {`
The following topics are shown on this page:
* __Transactions__ : Number of transactions made on a blockchain.
* __Active Wallets__ : Number of those wallets made at least a transaction during curtain period.

`}
        </HeaderSection>
        <Box pt={"4"}></Box>

        <HeaderSection title="Glance">
          {`

according section defined in above, i prepare some of static about these topics. all data came from Flipside data and with click of title of each item can see query these data in Flipside Crypto
`}
        </HeaderSection>
        <SimpleGrid
          my={"6"}
          columns={{ base: 1, md: 2, lg: 2, "2xl": 3 }}
          spacing={{ base: 5, lg: 8 }}
        >
          <StatsCard
            stat={`${dayInfo.tminFR[0].TMIN} C | ${dayInfo.tminFR[0].DATE} (FR)`}
            title={`T min FR`}
            status="inc"
            hasArrowIcon={false}
            link={""}
          />
          <StatsCard
            stat={`${dayInfo.tmaxFR[0].TMAX} C | ${dayInfo.tmaxFR[0].DATE} (FR)`}
            title={`T max FR`}
            status="inc"
            hasArrowIcon={false}
            link={""}
          />
          <StatsCard
            stat={`${dayInfo.tminJP[0].TMIN} C | ${dayInfo.tminJP[0].DATE} (JP)`}
            title={`T min JP`}
            status="inc"
            hasArrowIcon={false}
            link={""}
          />
          <StatsCard
            stat={`${dayInfo.tmaxJP[0].TMAX} C | ${dayInfo.tmaxJP[0].DATE} (FR)`}
            title={`T max JP`}
            status="inc"
            hasArrowIcon={false}
            link={""}
          />
          {daliyTotalInfo.map((station) => (
            <>
              <StatsCard
                stat={station._count._all}
                title={`Number of Days (${station.NAME})`}
                status="inc"
                hasArrowIcon={false}
                link={""}
              />
              <StatsCard
                stat={station._max.PRCP ?? 0}
                title={`Max PRCP (${station.NAME})`}
                status="inc"
                hasArrowIcon={false}
                link={""}
              />
              <StatsCard
                stat={+station._max.TMAX!}
                title={`Max Temp (${station.NAME})`}
                status="inc"
                hasArrowIcon={false}
                link={""}
              />

              <StatsCard
                stat={station._min.PRCP ?? 0}
                title={`Min PRCP (${station.NAME})`}
                status="inc"
                hasArrowIcon={false}
                link={""}
              />
              <StatsCard
                stat={+station._min.TMIN!}
                title={`Min Temp (${station.NAME})`}
                status="inc"
                hasArrowIcon={false}
                link={""}
              />
            </>
          ))}
        </SimpleGrid>

        <SimpleGrid
          position={"relative"}
          transition={"all 0.9s ease-in-out"}
          pb={"6"}
          gap={4}
          zIndex={100}
          columns={{ sm: 1, md: 1, lg: 2, "2xl": 3 }}
          spacing={{ base: 1, md: 2, lg: 4 }}
        >
          <HeaderSection title="Temperature" />
          <LineChartWithBar
            data={dailyTemperature}
            queryLink={""}
            title={"Temperature in FR"}
            baseSpan={3}
            customColor={colors[0]}
            barColor={colors[2]}
            xAxisDataKey="Day"
            barDataKey={"FR Temp"}
            lineDataKey="avg temp"
          />
          <LineChartWithBar
            data={dailyTemperature}
            queryLink={""}
            title={"Temperature in JP"}
            baseSpan={3}
            customColor={colors[0]}
            barColor={colors[2]}
            xAxisDataKey="Day"
            barDataKey={"JA Temp"}
            lineDataKey="avg Temp"
          />

          <HeaderSection title="Ratio of rainy days in 2022" />
          <DonutChart
            data={rainToNotRainRatio.dataFR}
            dataKey={"Days"}
            title="Rainy Day ratio in FR"
            nameKey="type"
            baseSpan={1}
            modalInfo={""}
          />

          <DonutChart
            data={rainToNotRainRatio.dataJA}
            dataKey={"Days"}
            title="Rainy Day ratio in JA"
            nameKey="type"
            baseSpan={1}
            modalInfo={""}
          />
          <HeaderSection title="Precipitation" />
          <LineChartWithBar
            data={dailyPrecipitation}
            queryLink={""}
            title={"Precipitation in FR"}
            baseSpan={3}
            customColor={colors[0]}
            barColor={colors[2]}
            xAxisDataKey="Day"
            barDataKey={"FR PRCP"}
            lineDataKey="avg PRCP"
          />
          <LineChartWithBar
            data={dailyPrecipitation}
            queryLink={""}
            title={"Precipitation in JP"}
            baseSpan={3}
            customColor={colors[0]}
            barColor={colors[2]}
            xAxisDataKey="Day"
            barDataKey={"JA PRCP"}
            lineDataKey="avg PRCP"
          />
          {/*
          <ChartBox
            data={transactionsTXInfo.data}
            queryLink={transactionsTXInfo.key}
            title={transactionsTXInfoNames[4]}
            baseSpan={3}
            customColor={colors[0]}
            xAxisDataKey="Day"
            areaDataKey="Cum tx count"
          /> */}
          <HeaderSection title="Active Wallets" />
          {/* <LineChartWithBar
            data={transactionsTXInfo.data}
            queryLink={transactionsTXInfo.key}
            title={transactionsTXInfoNames[2]}
            baseSpan={3}
            customColor={colors[0]}
            barColor={colors[2]}
            xAxisDataKey="Day"
            barDataKey={"Active users"}
            lineDataKey="AVG Active users"
          /> */}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default Home;
