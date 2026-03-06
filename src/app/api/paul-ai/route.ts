import { NextResponse } from "next/server";
import { z } from "zod";

import {
  PAUL_AI_SYSTEM_PROMPT,
  PAUL_AI_WEBSITE_CONTEXT,
} from "@/lib/paul-ai-context";
import { siteUrl } from "@/lib/site-config";

const payloadSchema = z.object({
  message: z.string().trim().min(4).max(3000),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().trim().min(1).max(3000),
      }),
    )
    .max(10)
    .optional(),
});

interface ChatCompletionResponse {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
  error?: {
    message?: string;
  };
}

const openRouterModelFallback = [
  "xiaomi/mimo-v2-flash",
  "deepseek/deepseek-v3.2",
  "qwen/qwen3.5-27b",
];

function parseModelCandidates(modelEnv: string | undefined, useOpenRouterDefaults: boolean) {
  const configured = (modelEnv || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  if (configured.length > 0) {
    return configured;
  }

  return useOpenRouterDefaults ? openRouterModelFallback : ["gpt-4.1-mini"];
}

function createFallbackReply(message: string): string {
  const normalized = message.toLowerCase();
  const bestuurKeywords = ["bestuur", "managing partner", "directie", "strategie"];
  const teamKeywords = ["team", "samenwerking", "frictie", "conflict"];
  const coachingKeywords = ["coaching", "rol", "partner", "ontwikkeling", "leiderschap"];
  const diagnosisKeywords = ["eerste keer", "zelfdiagnose", "start", "90 dagen"];

  let primaryTrack = "bestuursadvies";
  if (teamKeywords.some((token) => normalized.includes(token))) {
    primaryTrack = "teambegeleiding";
  } else if (coachingKeywords.some((token) => normalized.includes(token))) {
    primaryTrack = "coaching";
  } else if (bestuurKeywords.some((token) => normalized.includes(token))) {
    primaryTrack = "bestuursadvies";
  }

  const base =
    primaryTrack === "teambegeleiding"
      ? "Dit klinkt als een teamdynamiek-vraagstuk waarin structuur, rolhelderheid en werkbare afspraken het verschil maken."
      : primaryTrack === "coaching"
        ? "Dit raakt een persoonlijk leiderschapsvraagstuk: wat wil je behouden, wat moet anders, en welk gedrag hoort daarbij?"
        : "Dit klinkt als een bestuurlijke opgave waarin koers, samenwerking en executie tegelijk aandacht vragen.";

  const diagnosisHint = diagnosisKeywords.some((token) => normalized.includes(token))
    ? "Als je net start in een nieuwe rol, helpt het om eerst je bestuurlijke startprofiel scherp te krijgen met de zelfdiagnose."
    : "Een nuttige eerste stap is om de opgave te versmallen naar 1-2 beslissingen die je de komende 90 dagen echt moet nemen.";

  return [
    base,
    diagnosisHint,
    "",
    "Wat je nu concreet kunt doen:",
    "1. Benoem het kernvraagstuk in 1 zin (waar schuurt het precies?).",
    "2. Kies 2 hefbomen waarop je direct wilt sturen (bijv. strategie, cultuur, commercie, uitvoering of talent).",
    "3. Plan een kort gesprek om opties te toetsen op haalbaarheid en impact.",
    "",
    "Welke context is voor jou nu het meest urgent: bestuur, team of individuele rol?",
  ].join("\n");
}

async function fetchModelReply(
  message: string,
  history: Array<{ role: "user" | "assistant"; content: string }>,
) {
  const apiKey = process.env.PAUL_AI_API_KEY;

  if (!apiKey) {
    return {
      mode: "fallback" as const,
      reply: createFallbackReply(message),
    };
  }

  const isOpenRouterKey = apiKey.startsWith("sk-or-v1-");
  const baseUrl =
    process.env.PAUL_AI_BASE_URL ||
    (isOpenRouterKey
      ? "https://openrouter.ai/api/v1/chat/completions"
      : "https://api.openai.com/v1/chat/completions");
  const modelCandidates = parseModelCandidates(process.env.PAUL_AI_MODEL, isOpenRouterKey);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);

  try {
    for (const model of modelCandidates) {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      };

      if (baseUrl.includes("openrouter.ai")) {
        headers["HTTP-Referer"] = siteUrl;
        headers["X-Title"] = "Paul ter Linden";
      }

      const response = await fetch(baseUrl, {
        method: "POST",
        headers,
        body: JSON.stringify({
          model,
          temperature: 0.4,
          messages: [
            {
              role: "system",
              content: `${PAUL_AI_SYSTEM_PROMPT}\n\nWebsite context:\n${PAUL_AI_WEBSITE_CONTEXT}`,
            },
            ...history.slice(-8),
            {
              role: "user",
              content: message,
            },
          ],
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const err = (await response.json().catch(() => null)) as
          | ChatCompletionResponse
          | null;
        const errMsg = err?.error?.message || `Model request failed: ${response.status}`;
        console.error(`Paul AI model failed (${model}): ${errMsg}`);
        continue;
      }

      const data = (await response.json()) as ChatCompletionResponse;
      const text = data.choices?.[0]?.message?.content?.trim();

      if (!text) {
        console.error(`Paul AI model returned empty response (${model})`);
        continue;
      }

      return {
        mode: "live" as const,
        reply: text,
      };
    }

    throw new Error("No configured model returned a valid response");
  } catch (error) {
    console.error("Paul AI fallback triggered:", error);
    return {
      mode: "fallback" as const,
      reply: createFallbackReply(message),
    };
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = payloadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Controleer je bericht en probeer opnieuw.",
      },
      { status: 400 },
    );
  }

  const result = await fetchModelReply(parsed.data.message, parsed.data.history || []);

  return NextResponse.json({
    ok: true,
    reply: result.reply,
    mode: result.mode,
  });
}
