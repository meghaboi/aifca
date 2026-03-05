"use client";

import { useMutation } from "@tanstack/react-query";
import { runKimi } from "@/app/actions/ai";

export function useAI() {
  const mutation = useMutation({
    mutationFn: async (input: { prompt: string; systemPrompt?: string }) => {
      return runKimi(input.prompt, input.systemPrompt);
    },
  });

  return {
    ask: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
    response: mutation.data,
  };
}

