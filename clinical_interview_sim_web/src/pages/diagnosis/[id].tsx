import SymptomChecker from '@/components/SymptomChecker';
import { useState } from 'react'; // Añade esto
import { suggestDx } from '@/lib/diagnosisLogic'; // Crea este archivo si no existe
const [symptoms,setSymptoms] = useState<string[]>([]);

<SymptomChecker selected={symptoms} setSelected={setSymptoms} />

const choices = suggestDx(symptoms);   // usa los síntomas marcados
