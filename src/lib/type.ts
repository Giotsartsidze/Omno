export interface Webhook {
    id: number;
    nickname: string;
    url: string;
    createdAt: string;
    modifiedAt?: string;
    modifiedBy?: string;
    avatar?: string;
    authType: "No Authorization" | "Custom Header" | "Basic Authentication" | "Bearer Token" | "OAuth 2.0";
  }
  