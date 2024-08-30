import {defineStore, getActivePinia} from "pinia";

export const useNotificationStore = defineStore("notification", {
    state: () => ({
        notifications: [] as ToastNotification[]
    }),
    actions: {
        addNotification(notification: ToastNotification) {
            this.notifications.push(notification);
            setTimeout(() => {
                this.removeOldestNotification();
            }, 5000);
        },
        removeOldestNotification() {
            this.notifications.shift();
        }
    }
});

export function notify(options: {
    message: string;
    title?: string;
    type?: "success" | "error" | "warning" | "info";
}) {
    const pinia = getActivePinia();
    const store = useNotificationStore(pinia);
    if (!options.type) {
        options.type = "info";
    }
    const id = Math.random().toString(36);
    store.addNotification({id, ...options});

}

export function notifyHook(responseContent: Record<string, any>) {

    if (responseContent && Object.keys(responseContent).includes("_notify")) {
        const notifications: ToastNotification[] = responseContent["_notify"];
        notifications.forEach((notification) => {
            notify(notification);
        });
    }
}

interface ToastNotification {
    id: string;
    message: string;
    title?: string;
    type?: "success" | "error" | "warning" | "info";
}
