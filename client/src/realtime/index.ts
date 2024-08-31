import {RealtimeClient} from "@/realtime/realtimeClient.ts";
import {onBeforeUnmount, onMounted} from "vue";
import {Entity} from "@/types/index.ts";

const host = import.meta.env.VITE_WS
export const realtime = new RealtimeClient(
   host
)

export function listenForEntity(entity: string, event: 'list' | 'update' | 'create' | 'delete', callback: (data: Entity) => void) {
   const listener = (room: string, e: string, data: any) => {
      if (room === `entity:${entity}` && e === event) {
         callback(data.data)
      }
   }
   onMounted(() => {
      realtime.onMessage(listener)
      realtime.join(`entity:${entity}`, event)
   })

   onBeforeUnmount(() => {
      realtime.removeMessageListener(listener)
      realtime.leave(`entity:${entity}`, event)
   })

}
