import { useRouter } from 'next/router';
import { useContext } from 'react'; // Añade esto
import { useEffect, useRef, useState } from 'react';
import { AppCtx } from '../../context/AppProvider';
import { useChatSession } from '../../hooks/useChatSession';
import { ChatBubble } from '../../components/ChatBubble';
import { classifyQuestion } from '../../lib/colorHeuristic';
imp
// Si es una función de Firebase, probablemente necesites:
import { doc, getDoc } from 'firebase/firestore';

// Y usarla como:
const docRef = doc(db, "sessions", sessionId);
const docSnap = await getDoc(docRef);ort { FiSend, FiCornerDownLeft } from 'react-icons/fi';


export default function ChatPage() {
  const { query } = useRouter();
  const patientId = query.id as string; // route /chat/[id]
  const { messages, userSend } = useChatSession(['síntoma']);
  const { promptCount, incPrompt } = useContext(AppCtx);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  // auto‑scroll
  useEffect(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    await userSend(input.trim());
    setInput('');
  };

  return (
    <div className="flex flex-col h-screen">
      {/* ——— header inspirado en apps de mensajería ——— */}
      <header className="flex items-center px-4 py-2 bg-indigo-600 text-white shadow-sm">
        <button
          onClick={() => window.history.back()}
          className="mr-2 p-1 rounded hover:bg-indigo-500">
          <FiCornerDownLeft size={20} />
        </button>
        <div>
          <p className="font-semibold">Entrevista clínica</p>
          <p className="text-xs opacity-80">Sesión {promptCount < 4 ? 1 : 2}</p>
        </div>
      </header>

      {/* ——— mensajes ——— */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1 bg-slate-50">
        {messages.map((m, idx) => (
          <ChatBubble key={idx} msg={m} />
        ))}
        <div ref={endRef} />
      </div>

      {/* ——— input ——— */}
      <div className="flex items-center gap-2 px-3 py-2 border-t">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Pregunta..."
          className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none"
        />
        <button
          onClick={handleSend}
          disabled={promptCount >= 4}
          className={`p-2 rounded-lg ${promptCount >= 4 ? 'bg-gray-300' : 'bg-indigo-600 text-white hover:bg-indigo-500'}`}
        >
          <FiSend size={18} />
        </button>
      </div>
    </div>
  );
}
