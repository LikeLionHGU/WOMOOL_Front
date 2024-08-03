export function removeNonNumeric(str) {
  return str?.toString().replace(/\D/g, "");
}

export function formatDate(dateStr) {
  // Create a new Date object from the input string
  const date = new Date(dateStr);

  // Define an array of weekday abbreviations
  const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // Get the weekday abbreviation
  const weekday = weekdays[date.getUTCDay()];

  // Get the month (note: getUTCMonth() returns 0-based index, so add 1)
  const month = date.getUTCMonth() + 1;

  // Get the day of the month
  const day = date.getUTCDate();

  // Format the date as "M.DD"
  const formattedDate = `${month}.${day}`;

  // Return the result as an array
  return [weekday, formattedDate];
}

export function currentKoreanTime(date) {
  // Step 1: Create a new Date object with the desired date

  // Step 2: Define options for formatting the date
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Seoul",
  };

  // Step 3: Format the date using toLocaleDateString with the specified options
  const formattedDate = date.toLocaleDateString("en-CA", options); // 'en-CA' for YYYY-MM-DD format

  return formattedDate;
}

export function convertMlToL(ml, decimalPlaces = 2) {
  // Convert ml to liters
  let liters = ml / 1000;
  // Format the result to the specified number of decimal places
  let formattedLiters = liters.toFixed(decimalPlaces);
  // Remove trailing zeros
  formattedLiters = parseFloat(formattedLiters);
  // Return the formatted result
  return formattedLiters;
}
