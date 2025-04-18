import { FaceSmileIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { useSendMessage } from "../../hooks/useSendMessage";
import { useParams } from "react-router-dom";

export const MessageInput = () => {
  const { roomId } = useParams();
  const { sendMessage } = useSendMessage(roomId ? roomId : "");

  const handleSend = () => {
    sendMessage({
      message: "test1233",
    });
  };

  return (
    <div className="p-3 absolute w-full bottom-4">
      <label className="input input-primary w-full">
        <input placeholder="Send encrypted message" name="message" />
        <FaceSmileIcon className="size-7" />
        <PlusCircleIcon className="size-7" />
      </label>
      <button onClick={handleSend}>SEND</button>
    </div>
  );
};
