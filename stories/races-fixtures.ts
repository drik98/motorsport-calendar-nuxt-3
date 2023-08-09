import { Race } from '~/types/races'

export default [
  {
    id: 1,
    name: '24h vom Nürburgring',
    series: 'WEC',
    startDate: new Date('2023-05-23T15:00Z'),
    endDate: new Date('2023-05-24T15:00Z'),
    host: 'Josh',
    place: 'Nürgburg',
  },
  {
    id: 2,
    name: 'Großer Preis von Monaco',
    series: 'F1',
    startDate: new Date('2023-05-24T16:00Z'),
    endDate: new Date('2023-05-24T18:00Z'),
    host: 'Chris',
    place: 'Monte Carlo',
  },
] satisfies Race[]
