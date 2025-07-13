/**
 * AIResponder – devuelve texto para el paciente.
 * • En modos Entrenamiento / Medio: heurística local (sin coste).
 * • En Difícil / Realista: llama a GPT‑4o (OpenAI) con memoria breve.
 */

import OpenAI from 'openai';
import { Msg } from '../context/AppProvider';


const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
});

export type Difficulty = 'training' | 'medium' | 'hard' | 'realistic';

interface PatientProfile {
  name: string;
  age: number;
  diagnosis: string;
  symptoms: string[];
  personality: string; // “cooperativo”, “irritable”…
}

/** Genera respuesta del paciente */
export async function aiReply(
  userQ: string,
  history: Msg[],
  profile: PatientProfile,
  difficulty: Difficulty = 'training',
): Promise<string> {
  // ————————— Entrenamiento / Medio  —————————
  if (difficulty === 'training' || difficulty === 'medium') {
    return heuristicReply(userQ, profile.symptoms);
  }

  // ————————— Difícil / Realista  —————————
  try {
    const context = history
      .slice(-6)
      .map((m) => `${m.sender === 'user' ? 'P:' : 'C:'} ${m.text}`)
      .join('\n');

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `Eres el paciente "${profile.name}", ${profile.age} años, personalidad ${profile.personality}. 
Diagnóstico secreto: ${profile.diagnosis}. Síntomas principales: ${profile.symptoms.join(
            ', ',
          )}. Responde coherentemente al psicólogo en una sola burbuja.`,
        },
        { role: 'user', content: context + '\nP: ' + userQ },
      ],
      max_tokens: 60,
    });
    return completion.choices[0].message.content.trim();
  } catch (e) {
    console.warn('OpenAI error → fallback', e);
    return heuristicReply(userQ, profile.symptoms);
  }
}

/** Fallback offline muy simple */
function heuristicReply(question: string, symptoms: string[]) {
  const lower = question.toLowerCase();
  if (lower.includes('cómo') || lower.includes('que sientes')) {
    return `Bueno… últimamente ${symptoms[0]} casi cada día.`;
  }
  if (lower.includes('familia') || lower.includes('trabajo')) {
    return 'Mi familia me apoya, pero en el trabajo estoy estresado.';
  }
  return 'No sé muy bien qué contestar, ¿podrías explicarte?';
}
