interface AzureChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface AzureChatResponse {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
  error?: {
    message?: string;
  };
}

export async function callKimi(prompt: string, systemPrompt?: string) {
  const endpoint = process.env.AZURE_AI_FOUNDRY_ENDPOINT;
  const apiKey = process.env.AZURE_AI_FOUNDRY_API_KEY;
  const deployment = process.env.AZURE_AI_FOUNDRY_DEPLOYMENT;
  const apiVersion = process.env.AZURE_AI_FOUNDRY_API_VERSION;

  if (!endpoint || !apiKey || !deployment || !apiVersion) {
    throw new Error("Azure AI Foundry is not configured.");
  }

  const normalizedEndpoint = endpoint.endsWith("/") ? endpoint.slice(0, -1) : endpoint;
  const url = `${normalizedEndpoint}/chat/completions?api-version=${apiVersion}`;

  const messages: AzureChatMessage[] = [
    ...(systemPrompt ? [{ role: "system" as const, content: systemPrompt }] : []),
    { role: "user", content: prompt },
  ];

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      model: deployment,
      messages,
      max_tokens: 2048,
      temperature: 0.2,
    }),
    cache: "no-store",
  });

  const data = (await res.json()) as AzureChatResponse;

  if (!res.ok) {
    throw new Error(data.error?.message ?? "Kimi request failed.");
  }

  return data.choices?.[0]?.message?.content ?? "";
}

