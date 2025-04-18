import { useParams } from "react-router-dom";
import { useMessages } from "../../hooks/getMessages";

export const Messages = () => {
  const { roomId } = useParams();
  const { messages, isLoading } = useMessages(roomId ? roomId : "");

  if (isLoading) {
    return <p>Loading...</p>;
  }

  console.log(messages);

  return (
    <ul>
      {messages?.map((message) => (
        <p>{message.text}</p>
      ))}
    </ul>
  );
};
