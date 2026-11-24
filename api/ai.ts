// Server-only: GEMINI_API_KEY must never get a VITE_ prefix.
const MODEL = "gemini-3-flash-preview";
// Public Firebase web config value, used only to verify ID tokens.
const FIREBASE_WEB_KEY = "AIzaSyCSO1WsBqlOKugcCiMhkW89oP8uOZgd454";

const json = (body: unknown, status = 200) => Response.json(body, { status });
const clean = (value: unknown, max = 100) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

async function isSignedIn(request: Request) {
  const token = request.headers.get("authorization")?.replace(/^Bearer /, "");
  if (!token) return false;

  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${FIREBASE_WEB_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken: token }),
    },
  );
  return res.ok;
}

// Prompts live here so the endpoint can't be used as a general AI proxy.
function buildPrompt(body: any) {
  if (body?.type === "ideas") {
    const filterDescription = ["Budget", "Mood", "Setting", "Time"]
      .map((key) => [key, clean(body.filters?.[key], 30)])
      .filter(([, val]) => val && val !== "Any")
      .map(([key, val]) => `${key}: ${val}`)
      .join(", ");

    return {
      maxOutputTokens: 800,
      temperature: 1,
      prompt: `You are a highly creative date idea generator.

You MUST:
- Always generate between 5 and 10 ideas (never less than 5).
- Always follow the exact format strictly.
- Always respect the provided filters.
- If filters are restrictive, still generate ideas that match them as closely as possible.
- Never skip fields.
- Never explain anything outside the required format.

Generate 5 to 10 unique, creative, and engaging date ideas.

${filterDescription ? `Filters: ${filterDescription}.` : "No filters applied."}

Rules:
- Each idea MUST match the filters as closely as possible.
- If a filter is "Any", you can be flexible.
- Titles must be catchy and MAXIMUM 5 words.
- Descriptions must be 1-2 short sentences, exciting and specific (not generic).
- Tags must reflect BOTH the idea and the filters.
- Ensure ideas are diverse (different moods, locations, and activities).

STRICT FORMAT (repeat exactly for each idea):

TITLE: <short catchy title>
DESCRIPTION: <1-2 engaging sentences>
TAGS: #Tag1, #Tag2, #Tag3

IMPORTANT:
- Do NOT return less than 5 ideas.
- Do NOT return more than 10 ideas.
- Do NOT include numbering.
- Do NOT include extra text before or after.
- Separate each idea clearly using the format above.`,
    };
  }

  if (body?.type === "places") {
    const location = clean(body.location) || "Anywhere in the world";
    const tags = Array.isArray(body.tags)
      ? body.tags.slice(0, 8).map((tag: unknown) => clean(tag, 30)).join(", ")
      : "";

    return {
      maxOutputTokens: 400,
      temperature: 0.8,
      prompt: `You suggest real, specific local venues for dates. Return exactly 3 places, each as: '• Place Name — one sentence why it's perfect.' No extra text, just the list.

Suggest 3 real, currently operating places in or near "${location}" for a "${clean(body.title)}" date (vibe: ${tags}). Prioritize well-known or highly-rated venues that are good for dates.`,
    };
  }

  return null;
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return json({ error: "AI is not configured" }, 500);

  try {
    if (!(await isSignedIn(request))) {
      return json({ error: "Sign in required" }, 401);
    }

    const config = buildPrompt(await request.json().catch(() => null));
    if (!config) return json({ error: "Invalid request" }, 400);

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: config.prompt }] }],
          generationConfig: {
            temperature: config.temperature,
            maxOutputTokens: config.maxOutputTokens,
            topP: 0.95,
            topK: 60,
          },
        }),
      },
    );

    if (!res.ok) {
      console.error("Gemini error:", res.status);
      return json({ error: "AI request failed" }, 502);
    }

    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return text ? json({ text }) : json({ error: "No AI response" }, 502);
  } catch (error) {
    console.error("AI handler error:", error);
    return json({ error: "AI request failed" }, 500);
  }
}
