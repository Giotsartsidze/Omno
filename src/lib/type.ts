export interface Webhook {
    id: number;
    nickname: string;
    url: string;
    createdAt: string;
    modifiedAt?: string;
    modifiedBy?: string;
    avatar?: string;
    authType: "No Authorization" | "Custom Header" | "Basic Authentication" | "Bearer Token" | "OAuth 2.0";
    key ?: string
    value ?: string
    username ?: string
    password ?: string
    token ?: string
    oAuthAuthor ?: string
    tokenEndpoint ?: string
    clientId ?: string
    clientSecret ?: string
    grantType ?: string
  }
  