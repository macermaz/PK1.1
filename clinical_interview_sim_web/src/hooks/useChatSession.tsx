import { useContext } from 'react';
import { AppCtx, Msg } from '../context/AppProvider';
import { classifyQuestion } from '../lib/colorHeuristic';
import { aiReply } from '../lib/AIResponder';
interface Ctx {
  currentProfile: any; // Usa un tipo más específico si es posible
  currentDifficulty: string;
  // ... otras propiedades
}
/**
 * Hook principal del chat.
 * • Límite 4 prompts por sesión
 * • Colorea cada pregunta (brown / green / blue / purple)
 * • Usa aiReply() para obtener la respuesta del paciente
 */
export const useChatSession = () => {
  const {
    messages,
    send,
    promptCount,
    incPrompt,
    sessionId,
    currentProfile,      // <-- añadido al contexto
    currentDifficulty,   // <-- 'training' | 'medium' | 'hard' | 'realistic'
  } = useContext(AppCtx);

  /** Envía la pregunta del usuario y obtiene respuesta IA */
  const userSend = async (text: string) => {
    if (promptCount >= 4) return;

    // 1) color y push del mensaje usuario
    const color = classifyQuestion(text, promptCount);
    await send({ sender: 'user', text, color });

    incPrompt();

    // 2) respuesta IA (offline o GPT‑4o según dificultad)
    const replyText = await aiReply(
      text,
      messages as Msg[],
      currentProfile,
      currentDifficulty,
    );

    await send({ sender: 'patient', text: replyText });
  };

  return { messages, userSend };
};
