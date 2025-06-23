
interface MessageProps {
  text: string;
  
}

export const Message = ({ text }: MessageProps) => {
  return (
    <div className="flex flex-col">
      <div className="bg-white text-black font-mono px-4 py-2 rounded-xl self-start max-w-xs">
       {text}
      </div>
    </div>
  );
};