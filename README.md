# Motorsport Calendar 2.0

[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](https://dev--64d28e804eaa6986b47fc844.chromatic.com/)

This web application is the successor of [motorsport-calendar-vue](https://github.com/drik98/motorsport-calendar-vue).
Even though Gridsome was a practical tool at the time of creation it failed to migrate to vue 3 as well as it
has poor support for typescript. Thats why this project uses nuxt3.

## Setup

Make sure to install the dependencies:

```bash
pnpm install --shamefully-hoist
```

Also create a `.env` file in the root of the project containing at least the required environment variables:

| Environment Variable                   | Description                                                                                                                                              | Required | Default Value       |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | :------: | ------------------- |
| NUXT_GOOGLE_API_KEY                    | An access token which needs to be generated and has at least read permissions on the google sheet.                                                       |    ✅    | ``                  |
| NUXT_SPREADSHEET_ID=                   | The id of the google sheet from which the data is to be loaded                                                                                           |    ✅    | ``                  |
| NUXT_SPREADSHEET_NAME                  | The name of the google sheet from which the data is to be loaded                                                                                         |    ✅    | ``                  |
| NUXT_COLUMN_NAME                       | Needed to map the column containing the name of the race, e.g. `Le Mans 24h`                                                                             |    ❌    | `Rennen`            |
| NUXT_COLUMN_HOST                       | Needed to map the column containing the information about who hosts the race                                                                             |    ❌    | `Übertragung`       |
| NUXT_COLUMN_PLACE                      | Needed to map the column containing the place of the race, e.g. `Silverstone`                                                                            |    ❌    | `Ort`               |
| NUXT_COLUMN_TYPE                       | Needed to map the column containing the type of the race, e.g. `24h`                                                                                     |    ❌    | `Art`               |
| NUXT_COLUMN_DATE                       | Needed to map the column containing the date of the race, e.g. `30.06.2023` as well as `30.06.2023-01.07.2023` to give a range of dates                  |    ❌    | `Datum`             |
| NUXT_COLUMN_TIME                       | Needed to map the column containing the start time of the race                                                                                           |    ❌    | `Zeit`              |
| NUXT_COLUMN_DATE_FORMAT                | Can be used to customize the format of the date                                                                                                          |    ❌    | `DD.MM.YYYY mm:ss`  |
| NUXT_DEFAULT_RACE_DURATION             | Can be used to customize the default duration of the race if it is not a special race like the 24h of Nürburgring. Accepts a duration in ISO 8601 format |    ❌    | `H2` (2 hours)      |
| NUXT_PUBLIC_DEFAULT_FROM_DATE_DURATION | Will be used to calculate the inital from date. Accepts a duration in ISO 8601 format                                                                    |    ❌    | `P0D` (today)       |
| NUXT_PUBLIC_DEFAULT_TO_DATE_DURATION   | Will be used to calculate the inital to date. Accepts a duration in ISO 8601 format                                                                      |    ❌    | `P1W` (in one week) |

As you probably noticed each variable has to be prefixed with `NUXT_`. See [nuxt docs](https://nuxt.com/docs/api/composables/use-runtime-config).

## Development Server

Start the development server on <http://localhost:3000>

```bash
pnpm run dev
```

## Production

Build the application for production:

```bash
pnpm run build
```

Locally preview production build:

```bash
pnpm run preview
```

## Storybook

The custom components are documented and can be developed in isolation using Storybook.

Start the local development server on <http://localhost:6006>

```bash
pnpm run storybook
```

Locally build and preview production build:

```bash
# creates a complete bundle located at `./storybook-static`
pnpm run build-storybook
# starts local preview of it
pnpm dlx http-server ./storybook-static
```
