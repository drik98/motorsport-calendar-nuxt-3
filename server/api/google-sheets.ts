import { sheets_v4 } from '@googleapis/sheets'
import moment from 'moment-timezone'
import { RuntimeConfig } from 'nuxt/schema'
import { GoogleSpreadsheetRow } from '~/types/google-sheets'
import { Race } from '~/types/races'

export default defineEventHandler(async () => {
  const runtimeConfig = useRuntimeConfig()
  const valueRange: sheets_v4.Schema$ValueRange = await $fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${runtimeConfig.spreadsheetId}/values/${runtimeConfig.spreadsheetName}?key=${runtimeConfig.googleApiKey}`
  )
  return toObjectArray(valueRange)
    .map((row) => mapToRace(row, runtimeConfig))
    .sort(raceComparator)
})

/**
 * Takes a google sheets value range and transforms it so its easier to use
 * @param data data loaded from the google sheets API
 * @returns an array of objects with the column names as keys
 */
function toObjectArray(
  data: sheets_v4.Schema$ValueRange
): Array<GoogleSpreadsheetRow> {
  if (!data.values) {
    return []
  }

  const [columnValues, ...values] = data.values
  const columns = (columnValues as string[]).map((column) => column.trim())

  return values.map((row) => {
    const rowEntry: GoogleSpreadsheetRow = {}
    columns.forEach((column, columnIndex) => {
      rowEntry[column as string] = row[columnIndex]
    })
    return rowEntry
  })
}

/**
 * Takes the raw values from the google sheet and parses it to a Race object. All mappings
 * of the columns are configurable.
 *
 * If the endDate of a race is not explicetly provided it is calculated by the start date plus an estimation
 * of the length by the series or name of it. If the duration cannot be estimated a configurable default
 * configuration will be added.
 *
 * @param value the raw row value of the google sheet as a key value pair with the column names as key
 * @returns a RaceNode usuable in the graphQL collections
 */
function mapToRace(
  value: GoogleSpreadsheetRow,
  runtimeConfig: RuntimeConfig
): Race {
  const name = String(value[runtimeConfig.columnName])
  const host = String(value[runtimeConfig.columnHost])
  const place = String(value[runtimeConfig.columnPlace])
  const series = String(value[runtimeConfig.columnType])

  // the date column may contain a start date as well as an optional end date seperated by a dash
  const raceDates = String(value[runtimeConfig.columnDate])
    .split('-')
    .map((dateString) => dateString.trim())

  const startDate = moment
    .tz(
      `${raceDates[0]} ${value[runtimeConfig.columnTime]}`,
      runtimeConfig.columnFormatDate,
      'Europe/Berlin'
    )
    .toDate()

  const [estimatedDuration] =
    `${name} ${series}`
      .match(/\d+[Hh]/)
      ?.map((duration) => `PT${duration.toUpperCase()}`) ?? []

  const endDate =
    raceDates.length > 1
      ? moment
          .tz(
            `${raceDates[1]} ${value[runtimeConfig.columnTime]}`,
            runtimeConfig.columnFormatDate,
            'Europe/Berlin'
          )
          .toDate()
      : moment(startDate)
          .add(
            moment.duration(
              estimatedDuration ?? runtimeConfig.defaultRaceDuration
            )
          )
          .toDate()

   console.log({
      value,
      estimatedDuration,
      defaultRaceDuration: runtimeConfig.defaultRaceDuration,
      startDate,
      momentStart: moment(startDate),
      addedMoment:  moment(startDate)
      .add(
        moment.duration(
          estimatedDuration ?? runtimeConfig.defaultRaceDuration
        )
      ),
      duration:  estimatedDuration ?? runtimeConfig.defaultRaceDuration,
      momentDuration:  moment.duration(
         estimatedDuration ?? runtimeConfig.defaultRaceDuration
       ),
       p1mDuration: moment.duration('P1M'),
       p2hDuration: moment.duration('PT2H'),
      endDate
   })

  return {
    name,
    startDate,
    endDate,
    host,
    place,
    series,
  }
}

/**
 * A comparator that can be used to sort races by their startDate ascending
 * @param race1 the first race to compare
 * @param race2 the second race to compare against
 * @returns which race starts earlier
 */
function raceComparator(race1: Race, race2: Race): number {
  return race1.startDate.getTime() - race2.startDate.getTime()
}
