import { RealtimeClient } from "@vef/easy-api/mod.ts";
import { onBeforeUnmount, onMounted } from "vue";
import { Entry, Settings, User } from "@vef/types/mod.ts";

const host = import.meta.env.VITE_WS
export const realtime = new RealtimeClient(
  host
)

type EntryTypeEvent = "update" | "delete" | "join" | "leave"
type SettingsEvent = "update" | "join" | "leave"

export function joinRecord(entryType: string, id: string, callback: (event: EntryTypeEvent, data: Entry) => void) {
  const entryRoom = `entryType:${entryType}:${id}`

  const listener = (room: string, e: string, data: any) => {
    const ev = e as EntryTypeEvent
    if (room === entryRoom) {
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
    realtime.join(entryRoom)
  })

  onBeforeUnmount(() => {
    realtime.removeMessageListener(listener)
    realtime.leave(entryRoom)
  })
}

export function joinSettings(settings: string, callback: (event: SettingsEvent, data: Settings | {
  users: User[]
}) => void) {
  const settingsRoom = `settingsType:${settings}`

  const listener = (room: string, e: string, data: any) => {
    const ev = e as EntryTypeEvent
    if (room === settingsRoom) {
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
    realtime.join(settingsRoom)
  })

  onBeforeUnmount(() => {
    realtime.removeMessageListener(listener)
    realtime.leave(settingsRoom)
  })
}

export function listenForEntry(entryType: string, event: 'list' | 'update' | 'create' | 'delete', callback: (data: Entry) => void) {
  const listener = (room: string, e: string, data: any) => {
    if (room === `entryType:${entryType}` && e === event) {
      callback(data.data)
    }
  }
  onMounted(() => {
    realtime.onMessage(listener)
    realtime.join(`entryType:${entryType}`, event)
  })

  onBeforeUnmount(() => {
    realtime.removeMessageListener(listener)
    realtime.leave(`entryType:${entryType}`, event)
  })

}

export function listenForList(entryType: string, callback: (event: "create" | "update" | "delete", record: Entry) => void) {
  const listener = (room: string, e: string, message: any) => {
    if (room === `entryType:${entryType}` && e === "list") {
      const record = message.data
      const action = message.action
      callback(action, record)
    }
  }
  onMounted(() => {
    realtime.onMessage(listener)
    realtime.join(`entryType:${entryType}`, "list")
  })

  onBeforeUnmount(() => {
    realtime.removeMessageListener(listener)
    realtime.leave(`entryType:${entryType}`, "list")
  })

}
