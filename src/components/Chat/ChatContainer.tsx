import { ChatNavbar } from "./ChatNavbar";
import { MessageInput } from "./MessageInput";
import { Messages } from "./Messages";

export const ChatContainer = () => {
  return (
    <div className="bg-base-200 w-full min-w-[80%] relative">
      <ChatNavbar username="admin" profilePic="/default.jpg" />
      <Messages />
      <MessageInput />
    </div>
  );
};
