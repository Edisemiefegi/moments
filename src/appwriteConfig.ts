import { Client, Storage } from "appwrite";

export const client = new Client();
const url = (import.meta as any).env.VITE_APPWRITE_ENDPOINT;
const projectId = (import.meta as any).env.VITE_APPWRITE_PROJECT_ID;

client.setEndpoint(url).setProject(projectId);
export const storage = new Storage(client)
export { ID } from "appwrite";
