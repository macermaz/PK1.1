
const SYMPTOMS = ['ánimo','preocup','pánico','obses','trauma'];
const CONTEXT = ['familia','trabajo','estudios','infancia'];

export function classifyQuestion(text:string,index:number){
  const lower=text.toLowerCase();
  if(index===0) return 'brown';
  if(SYMPTOMS.some(k=>lower.includes(k))) return 'blue';
  if(CONTEXT.some(k=>lower.includes(k))) return 'green';
  if(/emocion|sentir|impact/i.test(lower)) return 'purple';
  return 'green';
}
