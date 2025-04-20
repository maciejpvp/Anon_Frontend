import { FaceSmileIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { useSendMessage } from "../../hooks/useSendMessage";
import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";

export const MessageInput = () => {
  const { roomId } = useParams();
  const messageInputRef = useRef<HTMLInputElement>(null);
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

  useEffect(() => {
    messageInputRef.current?.focus();
  }, [roomId]);

  return (
    <div className="p-3 absolute w-full bottom-4">
      <form onSubmit={handleSend}>
        <label className="input input-primary w-full">
          <input
            ref={messageInputRef}
            placeholder="Send encrypted message"
            name="message"
            required
            autoFocus
          />
          <FaceSmileIcon className="size-7" />
          <PlusCircleIcon className="size-7" />
        </label>
      </form>
    </div>
  );
};
