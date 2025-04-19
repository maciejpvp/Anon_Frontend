import { FaceSmileIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { useSendMessage } from "../../hooks/useSendMessage";
import { useParams } from "react-router-dom";

export const MessageInput = () => {
  const { roomId } = useParams();
  const { sendMessage } = useSendMessage(roomId ? roomId : "");

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const message = formData.get("message") as string;
    sendMessage({
      message,
    });
    e.currentTarget.reset();
  };

  return (
    <div className="p-3 absolute w-full bottom-4">
      <form onSubmit={handleSend}>
        <label className="input input-primary w-full">
          <input placeholder="Send encrypted message" name="message" required />
          <FaceSmileIcon className="size-7" />
          <PlusCircleIcon className="size-7" />
        </label>
      </form>
    </div>
  );
};
