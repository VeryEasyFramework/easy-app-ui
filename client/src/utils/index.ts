async function copyToClipboard(text: string) {
   await navigator.clipboard.writeText(text);
   return true;
}

function formatString(
   inputString: string,
   type: "titleCase" | "camelCase" | "snakeCase" | "pascal" | "initials"
) {
   if (!inputString) {
      return "";
   }
   let formattedString = "";
   const delimiter = getDelimiter(inputString);
   // format the inputString to title case
   if (type === "titleCase") {
      formattedString = inputString
         .split(delimiter)
         .map((word) => {
            return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
         })
         .join(" ");
   }
   if (type === "pascal") {
      formattedString = inputString.toLowerCase().replace(delimiter, "-");
   }
   if (type === "initials") {
      formattedString = inputString
         .split(delimiter)
         .map((val) => val[0])
         .join("")
         .toUpperCase();
   }
   if (type === "snakeCase") {
      formattedString = inputString.toLowerCase().replace(delimiter, "_");
   }
   return formattedString;
}

type delimiter = " " | "-" | "_";

function getDelimiter(inputString: string): delimiter {
   const delimiters: delimiter[] = [" ", "-", "_"];
   let selectedDelimiter: delimiter = " ";
   delimiters.forEach((delimiter) => {
      if (inputString.includes(delimiter)) {
         selectedDelimiter = delimiter;
         return delimiter;
      }
   });
   return selectedDelimiter;
}

function generateId(length?: number) {
   let result = "";
   const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
   const charactersLength = characters.length;
   for (let i = 0; i < (length || 8); i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

function padZeros(number: number, length?: number) {
   return number.toString().padStart(length || 2, '0');
}

function getPrettyDate(value: string | number, options?: {
   format?: 'standard' | 'pretty',
   showSeconds?: boolean,
}) {
   const date = new Date(value)
   // convert to local time
   date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
   if (isNaN(date.getTime())) {
      return value;
   }
   const formatPretty = (date: Date) => {
      const now = new Date()

      let title = ''
      let dateStr = date.toLocaleTimeString(
         undefined,
         {hour: '2-digit', minute: '2-digit'},
      )
      if (options?.showSeconds) {
         dateStr = date.toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
         })
      }
      if (now.toLocaleDateString() == date.toLocaleDateString()) {
         title = 'Today at'

         return `${title} ${dateStr}`

      }
      if (now.getFullYear() == date.getFullYear()) {
         if (
            date.getMonth().toString() + (date.getDay() + 1).toString() ==
            now.getMonth().toString() + now.getDay().toString()
         ) {
            title = 'Yesterday at'
            return `${title} ${dateStr}`
         }
      }
      let response = date.toString().substring(0, 15)
      if (options?.showSeconds) {
         response = date.toString().substring(0, 21)

      }
      return response
   }
   const format = options?.format || 'standard'
   switch (format) {
      case 'pretty':
         return formatPretty(date)
      default: {

         const day = padZeros(date.getDate());
         const month = padZeros(date.getMonth() + 1);
         const year = date.getFullYear();
         const hours = padZeros(date.getHours());
         const minutes = padZeros(date.getMinutes());
         const seconds = padZeros(date.getSeconds());
         return `${day}/${month}/${year} ${hours}:${minutes}${options?.showSeconds ? `:${seconds}` : ''}`;
      }
   }


}

function getDiffTime(endTime: string, StartTime: string) {
   const diff = new Date(endTime).getTime() - new Date(StartTime).getTime();
   return convertMillisToPretty(diff);
}

function convertMillisToPretty(millis: number): string {
   const seconds = Math.floor(millis / 1000);
   return convertSecondsToPretty(seconds);
}

function convertSecondsToPretty(seconds: number): string {
   const hoursLeft = parseInt(Math.floor(seconds / 3600).toFixed(0));
   const minLeft = Math.floor((seconds - hoursLeft * 3600) / 60);
   const secondsLeft = (seconds - hoursLeft * 3600 - minLeft * 60).toFixed(0);
   return `${String(hoursLeft).padStart(2, "0")}:${String(minLeft)}:${secondsLeft.padStart(
      2,
      "0"
   )}`;
}

function isEven(n: number) {
   return n % 2 === 0;
}

function isOdd(n: number) {
   return !isEven(n);
}

function formatDuration(seconds: number) {
   const minutes = Math.floor(seconds / 60);
   const hours = Math.floor(minutes / 60);
   const days = Math.floor(hours / 24);
   const weeks = Math.floor(days / 7);
   const months = Math.floor(weeks / 4);
   const years = Math.floor(months / 12);

   if (years > 0) {
      return `${years} years`;
   }
   if (months > 0) {
      return `${months} months`;
   }
   if (weeks > 0) {
      return `${weeks} weeks`;
   }
   if (days > 0) {
      return `${days} days`;
   }
   if (hours > 0) {
      return `${hours} hours`;
   }
   if (minutes > 0) {
      return `${minutes} minutes}`;
   }
   if (seconds > 0) {
      return `${seconds} seconds`;
   }
}

export {
   isEven,
   isOdd,
   formatString,
   generateId,
   getPrettyDate,
   getDiffTime,
   convertMillisToPretty,
   convertSecondsToPretty,
   formatDuration,
   copyToClipboard
};
