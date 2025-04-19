import { useAuthStore } from "../../store/authStore";
import { MessageType } from "../../types";

type MessageProps = {
  message: MessageType;
};

export const Message = ({ message }: MessageProps) => {
  const user = useAuthStore((s) => s.user);
  const userId = user?.userId || "";
  return (
    <div
      className={`chat ${
        message.senderId === userId ? "chat-end" : "chat-start"
      }`}
    >
      <li className="chat-bubble ">
        <p>{message.text}</p>
      </li>
    </div>
  );
};
