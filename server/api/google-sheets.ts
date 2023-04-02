export default defineEventHandler(async () => {
   const runtimeConfig = useRuntimeConfig()
   return $fetch(`https://sheets.googleapis.com/v4/spreadsheets/${runtimeConfig.spreadsheetId}/values/${runtimeConfig.spreadsheetName}?key=${runtimeConfig.googleApiKey}`);
});