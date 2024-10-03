import {RealtimeClient} from "@/realtime/realtimeClient.ts";
import {onBeforeUnmount, onMounted} from "vue";
import {EntityRecord} from "@/types/index.ts";

const host = import.meta.env.VITE_WS
export const realtime = new RealtimeClient(
   host
)

export function listenForEntity(entity: string, event: 'list' | 'update' | 'create' | 'delete', callback: (data: EntityRecord) => void) {
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

export function listenForList(entity: string, callback: (event: "create" | "update" | "delete", record: EntityRecord) => void) {
   const listener = (room: string, e: string, message: any) => {
      if (room === `entity:${entity}` && e === "list") {
         const record = message.data
         const action = message.action
         callback(action, record)
      }
   }
   onMounted(() => {
      realtime.onMessage(listener)
      realtime.join(`entity:${entity}`, "list")
   })

   onBeforeUnmount(() => {
      realtime.removeMessageListener(listener)
      realtime.leave(`entity:${entity}`, "list")
   })

}
