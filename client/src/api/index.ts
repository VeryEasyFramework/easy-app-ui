import { notify } from "@eveffer/easy-client";
import { EasyApi, RealtimeClient } from "@eveffer/easy-client";

export const api = new EasyApi();
api.onNotify((info) => {
  notify({
    message: info.message,
    title: info.title,
    type: info.type as any,
  });
});

export const realtimeClient = new RealtimeClient();
