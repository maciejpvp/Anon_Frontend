import { useParams } from "react-router-dom";
import { ChatContainer } from "../components/Chat/ChatContainer";
import { FriendList } from "../components/Chat/FriendList";
import { ChooseChat } from "../components/Chat/ChooseChat";

export const Chat = () => {
  const { roomId } = useParams();
  return (
    <div className="flex flex-row bg-base-200 [height:calc(100dvh-45px)]">
      <FriendList />
      {roomId ? <ChatContainer /> : <ChooseChat />}
    </div>
  );
};
