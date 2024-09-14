const colon = '<span class="json-colon">: </span>';


export function formatJson(contentRow: string) {

   let content = contentRow;
   const keyRegex = /"([^"]+)":/g;
   const valueRegex = /:\s+(.*$)/g;

   const keyResult = keyRegex.exec(content);
   if (!keyResult) {


      return `<div class="json-row">${formatValue(content)}</div>`;
   }
   const valueResult = valueRegex.exec(content);
   if (!keyResult || !valueResult) {
      return content;
   }

   const key = `<span class="json-key">"${keyResult[1]}"</span>`;
   const value = valueResult[1];
   const leadingSpaces = content.match(/^\s+/);
   const leading = leadingSpaces ? leadingSpaces[0] : '';


   return `<div class="json-row">${leading}${key}${colon}${formatValue(value)}</div>`;


}


function formatValue(value: string) {
   const stringRegex = /"([^"]+)"/g;
   const numberRegex = /(\d+)/g;
   const booleanRegex = /(true|false)/g;
   const stringResult = stringRegex.exec(value);
   if (stringResult) {
      const newValue = escapeHtml(stringResult[1]);
      return value.replace(stringRegex, `<span class="json-string">"${newValue}"</span>`);
   }
   const numberResult = numberRegex.exec(value);
   if (numberResult) {
      return value.replace(numberRegex, `<span class="json-number">${numberResult[1]}</span>`);
   }

   const booleanResult = booleanRegex.exec(value);
   if (booleanResult) {
      return value.replace(booleanRegex, `<span class="json-boolean">${booleanResult[1]}</span>`);
   }
   if (value === 'null') {
      return '<span class="json-null">null</span>';
   }
   if (value === 'undefined') {
      return '<span class="json-undefined">undefined</span>';
   }

   return value;
}


function escapeHtml(unsafe: string) {
   return unsafe.replace(/[&<>"']/g, (m) => {
      switch (m) {
         case '&':
            return '&amp;';
         case '<':
            return '&lt;';
         case '>':
            return '&gt;';
         case '"':
            return '&quot;';
         default:
            return '';
      }
   });
}
