import { auth } from "@/services/firebase";

type AiRequest =
  | { type: "ideas"; filters: Record<string, string> }
  | { type: "places"; title: string; tags: string[]; location: string };

/** Calls our server function; the AI key never reaches the browser. */
export async function generateAiText(request: AiRequest): Promise<string> {
  const token = await auth.currentUser?.getIdToken();
  if (!token) throw new Error("Please sign in again.");

  const res = await fetch("/api/ai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(request),
  });

  if (!res.ok) throw new Error(`AI request failed (${res.status})`);

  const { text } = await res.json();
  return text;
}
