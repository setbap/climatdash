import { Box, SimpleGrid } from "@chakra-ui/react";
import { StatsCard } from "lib/components/charts/StateCard";
import names from "lib/utility/names";
import { NextSeo } from "next-seo";
import HeaderSection from "lib/components/basic/HeaderSection";
import { WindType } from "pages/wind";
import { Fragment } from "react";
import StackedAreaChart from "lib/components/charts/StackedAreaGraph";

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

const Home = ({ totalWindInfo, dailyInfo }: WindType): JSX.Element => {
  return (
    <>
      <NextSeo title={`Wind | Transactions`} />
      <Box mx={"auto"} pt="4" px={{ base: 3, sm: 2, md: 8 }}>
        <HeaderSection title="Wind">
          {`
The Local Climatological Data (LCD) summaries provide a synopsis of climatic values for a single weather station over a specific month. The summaries are a product of surface observations from both manual and automated (AWOS, ASOS) stations with source data taken from the National Centers for Environmental Information’s Integrated Surface Data (ISD) dataset. Geographic availability includes thousands of locations worldwide. Climatic values given include hourly, daily, and monthly measurements of temperature, dew point, humidity, winds, sky condition, weather type, atmospheric pressure and more. [Dataset URL](https://www.ncei.noaa.gov/metadata/geoportal/rest/metadata/item/gov.noaa.ncdc:C00684/html)

The following metrics are displayed on this page:
Dew Point Temperature = Average dew point temperature for the day in Fahrenheit
Dry Bulb Temperature = Average dry bulb temperature for the day in Fahrenheit
Visibility = Average visibility for the day in miles
Wind speeds = Average wind speed for the day in miles per hour

`}
        </HeaderSection>
        <Box pt={"4"}></Box>

        <HeaderSection title="Glance" />
        <SimpleGrid
          my={"6"}
          columns={{ base: 1, md: 2, lg: 2, "2xl": 4 }}
          spacing={{ base: 3, lg: 6 }}
        >
          {totalWindInfo.map((station) => (
            <Fragment key={station.LOCATION}>
              <StatsCard
                stat={`${station._max.HourlyDewPointTemperature} | ${station.LOCATION}`}
                title={`Max Dew Point Temperature`}
                status="inc"
                hasArrowIcon={false}
              />
              <StatsCard
                stat={`${station._min.HourlyDewPointTemperature} | ${station.LOCATION}`}
                title={`Min Dew Point Temperature`}
                status="dec"
                hasArrowIcon={false}
              />

              <StatsCard
                stat={`${station._max.HourlyDryBulbTemperature} | ${station.LOCATION}`}
                title={`Max Dry Bulb Temperature`}
                status="inc"
                hasArrowIcon={false}
              />
              <StatsCard
                stat={`${station._min.HourlyDryBulbTemperature} | ${station.LOCATION}`}
                title={`Min Dry Bulb Temperature`}
                status="dec"
                hasArrowIcon={false}
              />

              <StatsCard
                stat={`${station._max.HourlyVisibility} | ${station.LOCATION}`}
                title={`Max Visibility`}
                status="inc"
                hasArrowIcon={false}
              />
              <StatsCard
                stat={`${station._min.HourlyVisibility} | ${station.LOCATION}`}
                title={`Min Visibility`}
                status="dec"
                hasArrowIcon={false}
              />

              <StatsCard
                stat={`${station._max.HourlyWindSpeed} | ${station.LOCATION}`}
                title={`Max Wind Speed`}
                status="inc"
                hasArrowIcon={false}
              />
              <StatsCard
                stat={`${station._min.HourlyWindSpeed} | ${station.LOCATION}`}
                title={`Min Wind Speed`}
                status="dec"
                hasArrowIcon={false}
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
          <HeaderSection title="Dew Temperature">
            {`
The dew point is the temperature the air needs to be cooled to (at constant pressure) in order to achieve a relative humidity (RH) of 100%. At this point the air cannot hold more water in the gas form.
            `}
          </HeaderSection>
          <StackedAreaChart
            extraInfoToTooltip=""
            modalInfo=""
            values={dailyInfo}
            title="Daily Dew Temperature"
            dataKey="Day FR"
            oyLabel=""
            oxLabel="Temperature in C"
            baseSpan={3}
            labels={[
              {
                color: colors[1],
                key: "Daily Dew Temperature FR",
              },
              {
                color: colors[2],
                key: "Daily Dew Temperature JA",
              },
            ]}
          />

          <HeaderSection title="Dry Bulb Temperature">
            {`
The Dry Bulb Temperature refers to the ambient air temperature. It is called "Dry Bulb" because the air temperature is indicated by a thermometer not affected by humidity. It is the same temperature as would be felt by the human body and is the temperature used by meteorologists to measure atmospheric conditions. It is also the temperature that is used to calculate the relative humidity of the air.
            `}
          </HeaderSection>
          <StackedAreaChart
            extraInfoToTooltip=""
            modalInfo=""
            values={dailyInfo}
            title="Daily Dry Bulb Temperature"
            dataKey="Day FR"
            oyLabel=""
            oxLabel="Temperature in C"
            baseSpan={3}
            labels={[
              {
                color: colors[1],
                key: "Daily Dry Bulb Temperature FR",
              },
              {
                color: colors[2],
                key: "Daily Dry Bulb Temperature JA",
              },
            ]}
          />

          <HeaderSection title="Visibility">
            {`
Visibility is a measure of the transparency of the atmosphere, which is an important aspect of meteorology, as it is related to air quality and safety, and it affects the operations of airports, ships, and other transportation networks. Poor visibility can also be a hazard to drivers, as it can reduce the ability to see obstacles and other vehicles on the road. Visibility is typically measured using a visibility meter, which measures the amount of light that is scattered in the atmosphere.
            `}
          </HeaderSection>
          <StackedAreaChart
            extraInfoToTooltip=""
            modalInfo=""
            values={dailyInfo}
            title="Daily Visibility"
            dataKey="Day FR"
            oyLabel=""
            oxLabel="Temperature in C"
            baseSpan={3}
            labels={[
              {
                color: colors[1],
                key: "Daily Visibility FR",
              },
              {
                color: colors[2],
                key: "Daily Visibility JA",
              },
            ]}
          />

          <HeaderSection title="Wind Speed" />
          <StackedAreaChart
            extraInfoToTooltip=""
            modalInfo=""
            values={dailyInfo}
            title="Daily Wind Speed"
            dataKey="Day FR"
            oyLabel=""
            oxLabel="Temperature in C"
            baseSpan={3}
            labels={[
              {
                color: colors[1],
                key: "Daily Wind Speed FR",
              },
              {
                color: colors[2],
                key: "Daily Wind Speed JA",
              },
            ]}
          />
        </SimpleGrid>
      </Box>
    </>
  );
};

export default Home;
