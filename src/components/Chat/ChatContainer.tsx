import { useMessages } from "../../hooks/getMessages";

type ChatContainerType = {
  roomId: string;
};

export const ChatContainer = ({ roomId }: ChatContainerType) => {
  const { messages, isLoading } = useMessages(roomId);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-base-200 w-full min-w-[80%]">
      <p>{roomId}</p>
    </div>
  );
};
