import {notify} from "@/notify/index.ts";
import {EasyApi} from "@vef/easy-api";


export const easyApi = new EasyApi(import.meta.env.VITE_API);
easyApi.onNotify((info) => {
   notify({
      title: info.title,
      message: info.message,
      type: info.type as "error" | "success" | "warning" | "info",
   });
});
