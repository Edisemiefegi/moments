import { Client, Storage } from "appwrite";

export const client = new Client();
const url = (import.meta as any).env.VITE_APPWRITE_ENDPOINT;
const projectId = (import.meta as any).env.VITE_APPWRITE_PROJECT_ID;

// Missing config must only disable photo uploads, not crash the whole app.
export const isStorageConfigured = Boolean(url && projectId);

if (isStorageConfigured) {
  client.setEndpoint(url).setProject(projectId);
} else {
  console.error("Appwrite is not configured: photo uploads are disabled.");
}

export const storage = new Storage(client)
export { ID } from "appwrite";
