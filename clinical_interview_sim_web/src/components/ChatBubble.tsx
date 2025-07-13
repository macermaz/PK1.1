import { Msg } from "../context/AppProvider";

export const ChatBubble = ({msg}:{msg:Msg})=>{
  const base = 'px-3 py-2 max-w-[70%] rounded-lg mb-1';
  const palette:any = {
    brown:'bg-amber-200', green:'bg-emerald-200',
    blue:'bg-sky-200', purple:'bg-violet-300'
  };
  const self = msg.sender==='user';
  return (
    <div className={`flex ${self?'justify-end':'justify-start'} w-full`}>
      <div className={`${base} ${self?'bg-indigo-500 text-white':palette[msg.color??'green']}`}>
        {msg.text}
      </div>
    </div>
  );
};
