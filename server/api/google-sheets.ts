import { sheets_v4 } from '@googleapis/sheets';
import parser from 'any-date-parser';
const dateParser = parser.exportAsFunction();

export default defineEventHandler(async () => {
   const runtimeConfig = useRuntimeConfig()
   return $fetch(`https://sheets.googleapis.com/v4/spreadsheets/${runtimeConfig.spreadsheetId}/values/${runtimeConfig.spreadsheetName}?key=${runtimeConfig.googleApiKey}`)
      .then( data => {
         return toObjectArray( data as sheets_v4.Schema$ValueRange ).map( toRace )
      })
});

type RowEntry = Record<string, string>;

function toObjectArray( data: sheets_v4.Schema$ValueRange ): Array<RowEntry> {
   if( !data.values ) {
      return [];
   }

   const [ columnValues, ...values ] = data.values;
   const columns = ( columnValues as string[] ).map(column => column.trim());

   return values.map( row => {
      const rowEntry: RowEntry = {  };
      columns.forEach( (column, columnIndex) => {
         rowEntry[column as string] = row[columnIndex];
      });
      return rowEntry;
   })
}

export type Race = {
   startDate: string
   endDate?: string
   startTime?: string
   endTime?: string
   host?: string
   type?: string
   name?: string
   karting?: string
   location?: string
   info?: string
} & Record<string, string>

function toRace( rowEntry: RowEntry ): Race {
   const { Datum, Rennen, Zeit, ...rest } = rowEntry;
   const [ startDate, endDate ] = Datum?.split('-').map(date => dateParser(date))  ?? [];

   const race: Race = {
      ...rest,
      startDate,
      endDate,
      name: Rennen,
      time: Zeit
   };

   return race;
}