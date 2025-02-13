
import { writable } from "svelte/store";

export const notifications = writable<Array<{ id: number; message: string; type: string }>>([]);

export function addNotification(message: string, type: string = "success") {
  try {
    const id = Date.now();  
    notifications.update((n) => [...n, { id, message, type }]);
    setTimeout(() => {
      notifications.update((n) => n.filter((notification) => notification.id !== id));
    }, 3000);
  } catch (error) {
    console.error("Error adding notification:", error);
  }
}
