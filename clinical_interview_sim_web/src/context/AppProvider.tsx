
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Timestamp } from 'firebase/firestore';
import { db, auth, } from '@/lib/firebase';
import {
  doc, setDoc, updateDoc, onSnapshot, addDoc,
  collection, query, orderBy, serverTimestamp
} from 'firebase/firestore';

export type Msg = { sender:'user'|'patient'; text:string; color?:string; created?:any };

interface Ctx {
  balance:number;      addBalance:(n:number)=>void;
  messages:Msg[];      send:(m:Msg)=>Promise<void>;
  promptCount:number;  incPrompt:()=>void;
  sessionId?:string;   startSession:(patId:string)=>Promise<void>;
}

export const AppCtx = createContext<Ctx>({} as Ctx);

export const AppProvider = ({children}:{children:ReactNode})=>{
  const [balance,setBalance]=useState(0);
  const [messages,setMessages]=useState<Msg[]>([]);
  const [promptCount,setPromptCount]=useState(0);
  const [sessionId,setSessionId]=useState<string>();

  // --- firestore sync messages ---
  useEffect(()=>{
    if(!sessionId) return;
    const q = query(collection(db,'sessions',sessionId,'messages'),orderBy('created'));
    const unsub = onSnapshot(q,snap=>{
      setMessages(snap.docs.map(d=>d.data() as Msg));
    });
    return unsub;
  },[sessionId]);

  // --- helpers ---
  const addBalance = (n:number)=>setBalance(b=>b+n);

  const send = async (m:Msg)=>{
    if(!sessionId) return;
    await addDoc(collection(db,'sessions',sessionId,'messages'),{
      ...m, created:serverTimestamp(),
    });
  };

  const incPrompt = ()=>setPromptCount(p=>p+1);

  const startSession = async (patientId:string)=>{
    const ref = await addDoc(collection(db,'sessions'),{
      userId:auth.currentUser?.uid??'anon',
      patientId, status:'active', created:Timestamp.now()
    });
    setSessionId(ref.id);
    setPromptCount(0);
  };

  return (
    <AppCtx.Provider value={{
      balance,addBalance,messages,send,
      promptCount,incPrompt,sessionId,startSession
    }}>
      {children}
    </AppCtx.Provider>
  );
};

