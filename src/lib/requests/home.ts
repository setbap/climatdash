import { DailySummaries } from "@prisma/client"
import prisma from "lib/requests/prisma"

export const getDaliyTotalInfo = () =>
  prisma.dailySummaries.groupBy({
    by: ['NAME'],
    _count: {
      _all: true
    },
    _max: {
      PRCP: true,
      TMAX: true
    },
    _min: {
      PRCP: true,
      TMIN: true
    }
  })


export const getDayInfo = async () => {
  const tminFR: DailySummaries[] = await prisma.$queryRaw`SELECT * FROM DailySummaries WHERE TMIN IS NOT NULL AND NAME = 'TOULOUSE BLAGNAC, FR' ORDER BY TMIN ASC LIMIT 1;`
  const tmaxFR: DailySummaries[] = await prisma.$queryRaw`SELECT * FROM DailySummaries WHERE TMAX IS NOT NULL AND NAME = 'TOULOUSE BLAGNAC, FR' ORDER BY TMAX DESC LIMIT 1;`
  const tminJP: DailySummaries[] = await prisma.$queryRaw`SELECT * FROM DailySummaries WHERE TMIN IS NOT NULL AND NAME = 'KAGOSHIMA, JA' ORDER BY TMIN ASC LIMIT 1;`
  const tmaxJP: DailySummaries[] = await prisma.$queryRaw`SELECT * FROM DailySummaries WHERE TMAX IS NOT NULL AND NAME = 'KAGOSHIMA, JA' ORDER BY TMAX DESC LIMIT 1;`

  return {
    tminFR,
    tmaxFR,
    tminJP,
    tmaxJP,
  }
}


export const getDailyPrecipitation = async () => {
  const data: { "Day": string, "FR PRCP"?: number, "JA PRCP"?: number }[] = await prisma.$queryRaw`
  with fr_prcp as (
	  select "DATE",PRCP as "FR PRCP" from DailySummaries where NAME ='TOULOUSE BLAGNAC, FR'
  ), jp_prcp as (
	  select "DATE",PRCP as "JA PRCP" from DailySummaries where NAME ='KAGOSHIMA, JA'
  )
	  select a."DATE" as "Day","FR PRCP","JA PRCP" from fr_prcp as a inner JOIN jp_prcp as b on a."DATE" = b."DATE";
  `

  return data.map(data => ({ "Day": data.Day, "FR PRCP": data["FR PRCP"] ?? 0, "JA PRCP": data["JA PRCP"] ?? 0 }))
}

export const getDailyTemperature = async () => {
  const data: { "Day": string, "FR Temp"?: number, "JA Temp"?: number }[] = await prisma.$queryRaw`
  with fr_TAVG as (
	  select "DATE",TAVG as "FR Temp" from DailySummaries where NAME ='TOULOUSE BLAGNAC, FR'
  ), jp_TAVG as (
	  select "DATE",TAVG as "JA Temp" from DailySummaries where NAME ='KAGOSHIMA, JA'
  )
	  select a."DATE" as "Day","FR Temp","JA Temp" from fr_TAVG as a inner JOIN jp_TAVG as b on a."DATE" = b."DATE";
  `

  return data.map(data => ({ "Day": data.Day, "FR Temp": data["FR Temp"] ?? 0, "JA Temp": data["JA Temp"] ?? 0 }))
}







export const getRainToNotRainRatio = async () => {
  const dataFR: { "Days": string, type: number }[] = await prisma.$queryRaw`
with not_rainy_day_fr as (
  select count(*)/1.0 as "Days", 'Not Rainy Count' as "type" from DailySummaries where PRCP = 0  and STATION = 'FR000007630'
), rainy_day_fr as (
  select count(*)/1.0 as "Days", 'Rainy Count' as "type" from DailySummaries where PRCP != 0 and STATION = 'FR000007630'
) select * from not_rainy_day_fr union select * from rainy_day_fr;
  `

  const dataJA: { "Days": string, type: number }[] = await prisma.$queryRaw`
with not_rainy_day_ja as (
  select count(*)/1.0 as "Days", 'Not Rainy Count' as "type" from DailySummaries where PRCP = 0  and STATION = 'JA000047827'
), rainy_rainy_day_ja as (
  select count(*)/1.0 as "Days", 'Rainy Count' as "type" from DailySummaries where PRCP != 0 and STATION = 'JA000047827'
) select * from not_rainy_day_ja union select * from rainy_rainy_day_ja;
  `


  return { dataFR, dataJA }
}