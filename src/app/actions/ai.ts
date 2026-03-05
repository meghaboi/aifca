"use server";

import { callKimi } from "@/lib/ai";

export async function runKimi(prompt: string, systemPrompt?: string) {
  return callKimi(prompt, systemPrompt);
}

