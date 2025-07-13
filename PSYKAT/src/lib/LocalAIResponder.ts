import { generatePatientReply } from './LocalAIService';
import { PatientProfile } from '@/types';

export async function aiReply(
  userText: string,
  history: string[],
  currentProfile: PatientProfile,
  difficulty: 'training' | 'medium' | 'hard' | 'realistic'
) {
  // join last 6 messages as lightweight context
  const ctx = history.slice(-99).join('\n');
  const prompt = `${ctx}\n${userText}`;
  return generatePatientReply(prompt, currentProfile.label, difficulty);
}
