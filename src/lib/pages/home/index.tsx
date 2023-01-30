import { Box, SimpleGrid } from "@chakra-ui/react";
import ChartBox from "lib/components/charts/LineChart";
import { StatsCard } from "lib/components/charts/StateCard";
import names from "lib/utility/names";
import { NextSeo } from "next-seo";
import { HomeType } from "pages";
import LineChartWithBar from "lib/components/charts/LineChartWithBar";
import HeaderSection from "lib/components/basic/HeaderSection";
import DonutChart from "lib/components/charts/DonutChart";
import { Fragment } from "react";

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
      <NextSeo title={`Temperature & Precipitation`} />
      <Box mx={"auto"} pt="4" px={{ base: 3, sm: 2, md: 8 }}>
        <HeaderSection title="Temperature & Precipitation">
          {`
GHCN (Global Historical Climatology Network)-Daily is a database that addresses the critical need for historical daily temperature, precipitation, and snow records over global land areas. GHCN-Daily is a composite of climate records from numerous sources that were merged and then subjected to a suite of quality assurance reviews. The archive includes over 40 meteorological elements including temperature daily maximum/minimum, temperature at observation time, precipitation, snowfall, snow depth, evaporation, wind movement, wind maximums, soil temperature, cloudiness, and more. [Dataset URL](https://www.ncei.noaa.gov/metadata/geoportal/rest/metadata/item/gov.noaa.ncdc:C00861/html)

The following metrics are displayed on this page:

* Precipitation = Total precipitation for the in inches

* Temperature = Average temperature for the day in Fahrenheit and Celsius

* T MAX = Maximum temperature for the day in Fahrenheit and Celsius

* T MIN = Minimum temperature for the day in Fahrenheit and Celsius

The data pertain to two countries, France and Japan, since the beginning of 2022.
`}
        </HeaderSection>
        <Box pt={"4"}></Box>

        <HeaderSection title="Glance" />

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
          {daliyTotalInfo.map((station, index) => (
            <Fragment key={index.toString() + station.NAME}>
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
            </Fragment>
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
        </SimpleGrid>
      </Box>
    </>
  );
};

export default Home;
