import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ScoreCard } from '../../components/ScoreCard'
import { SessionStats } from '@lib/ScoreEngine';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function ScorePage(){
  const { query } = useRouter();
  const [stats,setStats] = useState<SessionStats>();

  useEffect(()=>{
    async function load(){
      if(!query.id) return;
      const snap = await getDoc(doc(db,'sessions',query.id as string));
      if(snap.exists()) setStats(snap.data() as SessionStats);
    }
    load();
  },[query.id]);

  if(!stats) return <p className="p-4">Cargando...</p>;

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Informe de sesión</h1>
      <ScoreCard stats={stats}/>
    </div>
  );
}
