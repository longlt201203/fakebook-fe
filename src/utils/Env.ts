export class Env {
    static readonly API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
    static readonly GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";
    static readonly GOOGLE_REDIRECT_URL = import.meta.env.VITE_GOOGLE_REDIRECT_URL || "http://localhost:5173/google-auth";
}