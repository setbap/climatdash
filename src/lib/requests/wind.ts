import prisma from "lib/requests/prisma"
import { DailyWindInfo } from "lib/types/types/info"

export const getTotalWindInfo = () =>
  prisma.localClimatologicalData.groupBy({
    by: ['STATION', 'LOCATION'],
    _max: {
      HourlyDewPointTemperature: true,
      HourlyDryBulbTemperature: true,
      HourlyVisibility: true,
      HourlyWindSpeed: true,
    },
    _min: {
      HourlyDewPointTemperature: true,
      HourlyDryBulbTemperature: true,
      HourlyVisibility: true,
      HourlyWindSpeed: true,
    },
    where: {
      AND: {
        HourlyDewPointTemperature: {
          not: null
        },
        HourlyDryBulbTemperature: {
          not: null
        },
        HourlyVisibility: {
          not: null
        },
        HourlyWindSpeed: {
          not: null
        },
      }
    }
  })



export const getDailyInfo = async () => {
  const data: DailyWindInfo[] = await prisma.$queryRaw`
    with fr_daily as (
SELECT
	strftime ('%Y-%m-%d',DATE) AS "Day FR",
	ROUND(AVG(HourlyDewPointTemperature),1) as "Daily Dew Temperature FR",
	ROUND(AVG(HourlyDryBulbTemperature),1) as "Daily Dry Bulb Temperature FR",
	ROUND(AVG(HourlyVisibility),1) as "Daily Visibility FR",
	ROUND(AVG(HourlyWindSpeed),1) as "Daily Wind Speed FR"
FROM
	LocalClimatologicalData
WHERE
	LOCATION = 'FR'
GROUP BY
	strftime ('%Y-%m-%d',DATE)
), ja_daily as (
SELECT
	strftime ('%Y-%m-%d',DATE) AS "Day JA",
	ROUND(AVG(HourlyDewPointTemperature),1) as "Daily Dew Temperature JA",
	ROUND(AVG(HourlyDryBulbTemperature),1) as "Daily Dry Bulb Temperature JA",
	ROUND(AVG(HourlyVisibility),1) as "Daily Visibility JA",
	ROUND(AVG(HourlyWindSpeed),1) as "Daily Wind Speed JA"
FROM
	LocalClimatologicalData
WHERE
	LOCATION = 'JP'
GROUP BY
	strftime ('%Y-%m-%d',DATE)
) select * from ja_daily inner join fr_daily on ja_daily."Day JA" = fr_daily."Day FR";
    `
  return data
}