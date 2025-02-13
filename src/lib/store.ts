import { writable } from "svelte/store";
import type { Webhook } from "./type";
import { addNotification } from "./notifications";

// Store for the original list of webhooks (allWebhooks)
export const allWebhooks = writable<Webhook[]>([
  {
    id: 1,
    nickname: "Payment Hook",
    url: "https://example.com/webhook",
    createdAt: "2024-02-01",
    modifiedAt: "2024-02-10",
    modifiedBy: "John Doe",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    authType: "OAuth 2.0",
  },
  {
    id: 2,
    nickname: "Order Hook",
    url: "https://example.com/order-webhook",
    createdAt: "2024-01-15",
    modifiedAt: "2024-02-05",
    modifiedBy: "Jane Smith",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    authType: "Custom Header",
  },
  {
    id: 3,
    nickname: "Payment Hook",
    url: "https://example.com/webhook",
    createdAt: "2024-02-01",
    modifiedAt: "2024-02-10",
    modifiedBy: "John Doe",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    authType: "OAuth 2.0",
  },
  {
    id: 4,
    nickname: "Order Hook",
    url: "https://example.com/order-webhook",
    createdAt: "2024-01-15",
    modifiedAt: "2024-02-05",
    modifiedBy: "Jane Smith",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    authType: "Custom Header",
  },
]);

// Store for the filtered list of webhooks (webhooks)
export const webhooks = writable<Webhook[]>([]);

export function addWebhook(newWebhook: Omit<Webhook, "id">) {
  webhooks.update((list) => [...list, { id: Date.now(), ...newWebhook }]);
  addNotification("Created Successfully", "success");
}

export function updateWebhook(updatedWebhook: Webhook) {
  webhooks.update((list) =>
    list.map((hook) => (hook.id === updatedWebhook.id ? updatedWebhook : hook))
  );
  addNotification("Updated Successfully", "success");
}

export function deleteWebhook(id: number) {
  webhooks.update((list) => list.filter((hook) => hook.id !== id));
  addNotification("Deleted Successfully", "error");
}
