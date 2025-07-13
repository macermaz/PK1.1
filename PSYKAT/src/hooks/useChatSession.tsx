import { useState } from 'react';
import { Patient } from '@/types';
import { classifyQuestion } from '@/utils/colorHeuristic';
import { generateAIReply } from '@/services/LocalAIService';

export interface ChatMsg {
  role: 'user' | 'patient';
  text: string;
  color?: string;
}

export function useChatSession(patient: Patient) {
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [promptCount, setPromptCount] = useState(0);

  const sendUser = async (text: string) => {
    if (promptCount >= 4) return;

    const color = classifyQuestion(text, promptCount);
    setMessages(prev => [...prev, { role: 'user', text, color }]);
    setPromptCount(c => c + 1);

    const systemCtx = `
      [PERFIL]
      Nombre: ${patient.name}. Edad: ${patient.age}.
      Personalidad: ${patient.personality}.
      Historia: ${patient.backstory}.
      Responde como paciente en primera persona. Sé coherente y no menciones que eres una IA.
    `;

    const reply = await generateAIReply(text, systemCtx);
    setMessages(prev => [...prev, { role: 'patient', text: reply }]);
  };

  return { messages, sendUser, promptCount };
}
