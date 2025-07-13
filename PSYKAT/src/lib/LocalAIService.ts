import path from 'path';
import { LLM } from '@llama-node/llama-cpp';

const modelPath = process.env.MODEL_PATH ||
  path.join(process.cwd(), 'models', 'Llama-3-Mopeyfied-Psychology-v2.IQ3_M.gguf');

let llm: LLM | null = null;

async function load() {
  if (llm) return;
  llm = new LLM();
  await llm.load({
    modelPath,
    nCtx: 2048,
    nGpuLayers: 0        // CPU‑only; sube a 1‑2 si tienes GPU con 4 GB
  });
}

export async function generatePatientReply(
  userPrompt: string,
  profile: string,
  difficulty: 'training' | 'medium' | 'hard' | 'realistic'
) {
  await load();
  const sysPrompt = `
Eres un paciente simulado para entrenamiento clínico.
Perfil: ${profile}.
Modo dificultad: ${difficulty}.
Responde de forma coherente con tu historia clínica y síntomas, en español coloquial, máx. 3‑4 frases.
`;
  const fullPrompt = `${sysPrompt}\nTerapeuta: ${userPrompt}\nPaciente:`;
  const res = await llm!.createCompletion({
    prompt: fullPrompt,
    temperature: 0.7,
    maxTokens: 200
  });
  return res.choices[0].text.trim();
}
