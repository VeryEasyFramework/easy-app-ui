import {GetListResult, ListOptions} from "@/api/apiTypes.ts";
import {BaseEntity, Entity} from "@/types/index.ts";
import {notify} from "@/notify/index.ts";

export interface ErrorInfo {
   statusCode: number;
   message: string;
   title?: string;
}

export class EasyApi {
   host: string;
   private notify: (
      info: { message: string; title: string; type: string },
   ) => void = (info) => {
      console.error(info);
   };

   constructor(host?: string) {
      this.host = host || "/api";
   }

   async call<T extends Record<string, any>>(
      group: string,
      action: string,
      data?: Record<string, any>,
   ): Promise<T> {
      const url = `${this.host}?group=${group as string}&action=${action}`;
      const response = await fetch(url, {
         method: "POST",
         // credentials: "include",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(data),
      }).catch((e) => {
         this.notify({
            message: e.message,
            title: "Network Error",
            type: "error",
         });
         return new Response(null, {status: 500});
      });
      if (!response.ok) {
         if (response.status === 302) {
            window.location.href = response.headers.get("Location") || "/";
         }

         const content = await response.text();
         const info = this.parseError(response, content);
         const title = `${info.title || "API Error"} - ${info.statusCode}`;
         if (
            group === "auth" && action === "check" && info.statusCode === 401
         ) {
            return {} as T;
         }
         this.notify({
            message: info.message,
            title: title,
            type: "error",
         });
         return {} as T;
      }
      const responseContent = await response.json();

      return responseContent;
   }

   async getList<T extends Entity = Entity>(entity: string, options?: ListOptions): Promise<GetListResult<T>> {
      const fullOptions = {
         ...options,
         entity
      }
      return await this.call<GetListResult<T>>('entity', "getList", fullOptions);
   }

   private parseError(response: Response, errorContent: string) {
      const info = {} as ErrorInfo;
      info.statusCode = response.status;
      let content: any;
      try {
         content = JSON.parse(errorContent ?? "");
         if ("error" in content) {
            content = content.error
         }
         info.message = content;
      } catch (_e) {
         content = errorContent;
      }
      info.message = content;
      return info;
   }

   onNotify(
      callback: (info: { message: string; title: string; type: string }) => void,
   ) {
      this.notify = callback;
   }
}


export const easyApi = new EasyApi(import.meta.env.VITE_API);
easyApi.onNotify((info) => {
   notify({
      title: info.title,
      message: info.message,
      type: info.type as "error" | "success" | "warning" | "info",
   });
});
