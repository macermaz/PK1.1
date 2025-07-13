// @ts-ignore
import { parentPort } from 'worker_threads';
import { generatePatientReply } from '@LocalAIService';

parentPort!.on('message', async (msg) => {
  const { userText, history, profile, difficulty } = msg;
  const reply = await generatePatientReply(userText, profile, difficulty);
  parentPort!.postMessage({ reply });
});
