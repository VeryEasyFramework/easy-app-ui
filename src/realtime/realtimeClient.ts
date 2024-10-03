export interface SocketRoom {
   roomName: string;
   events: string[];
}

export  type SocketStatus = "open" | "closed" | "connecting" | "error";

export class RealtimeClient {
   private socket!: WebSocket;
   private readonly host: string;
   private rooms: { name: string; events: string[] }[] = [];
   private messageListeners: ((room: string, event: string, data: any) => void)[] = [];
   private statusListeners: ((status: SocketStatus) => void)[] = [];
   private manualClose = false;

   get connected() {
      return this.socket?.readyState === WebSocket.OPEN;
   }

   get connecting() {
      return this.socket?.readyState === WebSocket.CONNECTING;
   }

   get closed() {
      return this.socket?.readyState === WebSocket.CLOSED;
   }

   constructor(host?: string) {
      const protocol = window.location.protocol === "https:" ? "wss" : "ws";
      this.host = host || `${protocol}://${window.location.host}/ws`;
   }


   onMessage(callback: (room: string, event: string, data: Record<string, any>) => void) {
      if (this.messageListeners.includes(callback)) {
         return;
      }
      this.messageListeners.push(callback);
   }

   removeMessageListener(callback: (room: string, event: string, data: Record<string, any>) => void) {
      this.messageListeners = this.messageListeners.filter((cb) => cb !== callback);
   }

   onStatusChange(callback: (status: SocketStatus) => void) {
      this.statusListeners.push(callback);
   }

   removeStatusListener(callback: (status: SocketStatus) => void) {
      this.statusListeners = this.statusListeners.filter((cb) => cb !== callback);
   }

   connect() {
      this.socket = new WebSocket(this.host);
      this.manualClose = false;
      this.notifyStatus("connecting");
      this.socket.addEventListener("open", (event) => {
         this.notifyStatus("open");
         this.rejoinRooms();
         this.socket.addEventListener("close", async (event) => {
            this.notifyStatus("closed");
            if (!this.manualClose) {
               this.retryReconnect(1000);
            }
         });
         this.socket.addEventListener("message", (event) => {

            let data;
            try {

               data = JSON.parse(event.data);
            } catch (e) {
               data = {
                  data: event.data
               }
            }
            if ('room' in data && 'event' in data && 'data' in data) {

               for (const listener of this.messageListeners) {
                  listener(data.room, data.event, data.data);
               }
            }
         });
      });
      this.socket.addEventListener("error", (event) => {
         this.notifyStatus("error");
         // console.log("socket error", event);
      });
   }

   private notifyStatus(status: SocketStatus) {
      for (const listener of this.statusListeners) {
         listener(status);
      }
   }

   private retryReconnect(attempts: number) {
      let count = 0;
      const interval = setInterval(() => {
         if (count >= attempts) {
            clearInterval(interval);
            return;
         }
         if (this.connected) {
            clearInterval(interval);
            return;
         }
         if (this.closed) {
            count++;
            console.log(`Reconnecting... ${count}/${attempts}`);
            this.reconnect();
         }
      }, 1000);
   }

   private reconnect() {
      if (this.closed) {
         this.connect();
      }
   }

   private rejoinRooms() {
      for (const room of this.rooms) {
         if (room.events.length === 0) {
            this.send({type: "join", room: room.name});
            return;
         }
         for (const event of room.events) {
            this.send({type: "join", room: room.name, event});
         }
      }
   }


   join(room: string, event: string) {


      if (!this.rooms.find((r) => r.name === room)) {
         this.rooms.push({name: room, events: [event]});
      } else {
         this.rooms = this.rooms.map((r) => {
            if (r.name === room) {
               r.events.push(event);
            }
            return r;
         });
      }
      this.send({type: "join", room, event});
   }

   leave(room: string, event?: string) {
      if (event) {
         this.rooms = this.rooms.map((r) => {
            if (r.name === room) {
               r.events = r.events.filter((e) => e !== event);
            }
            return r;
         });
      } else {
         this.rooms = this.rooms.filter((r) => r.name !== room);
      }
      this.send({type: "leave", room, event});
   }

   disconnect() {
      this.manualClose = true;
      this.socket.close();
   }

   private send(message: Record<string, any>) {
      if (!this.connected) {
         return;
      }
      this.socket.send(JSON.stringify(message));
   }
}
