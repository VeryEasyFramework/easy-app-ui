import { RealtimeClient } from "@vef/easy-api/mod.ts";
import { onBeforeUnmount, onMounted } from "vue";
import type { EntityRecord } from "@vef/types";
import { SettingsRecord, User } from "@vef/types/mod.ts";

const host = import.meta.env.VITE_WS
export const realtime = new RealtimeClient(
  host
)

type EntityEvent = "update" | "delete" | "join" | "leave"
type SettingsEvent = "update" | "join" | "leave"

export function joinRecord(entity: string, id: string, callback: (event: EntityEvent, data: EntityRecord) => void) {
  const entityRoom = `entity:${entity}:${id}`

  const listener = (room: string, e: string, data: any) => {
    const ev = e as EntityEvent
    if (room === entityRoom) {
      switch (ev) {
        case "join":
          callback(ev, data)
          break
        case "leave":
          callback(ev, data)
          break
        case "update":
          callback(ev, data.data)
          break
        case "delete":
          callback(ev, data.data)
          break
      }
    }
  }
  onMounted(() => {
    realtime.onMessage(listener)
    realtime.join(entityRoom)
  })

  onBeforeUnmount(() => {
    realtime.removeMessageListener(listener)
    realtime.leave(entityRoom)
  })
}

export function joinSettings(settings: string, callback: (event: SettingsEvent, data: SettingsRecord | {
  users: User[]
}) => void) {
  const entityRoom = `settings:${settings}`

  const listener = (room: string, e: string, data: any) => {
    const ev = e as EntityEvent
    if (room === entityRoom) {
      switch (ev) {
        case "join":
          callback(ev, data)
          break
        case "leave":
          callback(ev, data)
          break
        case "update":
          callback(ev, data.data)
          break
      }
    }
  }
  onMounted(() => {
    realtime.onMessage(listener)
    realtime.join(entityRoom)
  })

  onBeforeUnmount(() => {
    realtime.removeMessageListener(listener)
    realtime.leave(entityRoom)
  })
}

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
