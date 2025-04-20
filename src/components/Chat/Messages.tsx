import { useParams } from "react-router-dom";
import { useMessages } from "../../hooks/getMessages";
import { Message } from "./Message";
import { useEffect } from "react";
import { useSocketStore } from "../../store/socketStore";
import { useSocketMessage } from "../../hooks/useSocketMessage";

export const Messages = () => {
  const { roomId } = useParams();
  const socket = useSocketStore((s) => s.socket);
  const { messages, isLoading } = useMessages(roomId ? roomId : "");
  const { addMessage } = useSocketMessage();

  useEffect(() => {
    socket?.on("new-message", (data) => {
      console.log(data);
      if (data.senderId === roomId) {
        addMessage(data, roomId);
      }
    });

    return () => {
      socket?.off("new-message");
    };
  }, [socket, addMessage, roomId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="h-[calc(100%-130px)] overflow-y-auto flex flex-col-reverse p-4 bg-base-200 rounded-box">
      {messages?.length ? (
        <ul className="flex flex-col-reverse gap-2">
          {messages
            ?.slice()
            .reverse()
            .map((message) => (
              <Message key={message._id} message={message} />
            ))}
        </ul>
      ) : (
        <div className=" h-full flex items-center justify-center text-lg">
          Start a new converstaion
        </div>
      )}
    </div>
  );
};
