import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { MessageType } from "../../types";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { MessageCopyButton } from "./Message/MessageCopyButton";
import { EditMessageButton } from "./Message/EditMessageButton";
import { useEditMessage } from "../../hooks/useEditMessage";
import { useParams } from "react-router-dom";
import { DeleteMessageButton } from "./Message/DeleteMessageButton";
import { useDropdownStore } from "../../store/dropdownStore";

type MessageProps = {
  message: MessageType;
};

export const Message = ({ message }: MessageProps) => {
  const user = useAuthStore((s) => s.user);
  const { roomId } = useParams();
  const { editMessage } = useEditMessage(message._id, roomId ? roomId : "");
  const [isInEditMode, setIsInEditMode] = useState<boolean>(false);

  const activeDropdown = useDropdownStore((s) => s.activeDropdown);
  const setActiveDropdown = useDropdownStore((s) => s.setActiveDropdown);
  const closeDropdown = useDropdownStore((s) => s.closeDropdown);

  const userId = user?.userId || "";

  const handleDropdown = () => {
    if (activeDropdown === message._id) {
      closeDropdown();
      return;
    }
    setActiveDropdown(message._id);
  };

  const handleEditMessage = () => {
    closeDropdown();
    setIsInEditMode(true);
  };

  const handleSubmitEditedMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newMessage = formData.get("message") as string;
    console.log(newMessage);
    if (!newMessage) return;
    editMessage({ message: newMessage });

    setIsInEditMode(false);
  };

  return (
    <div
      className={`chat ${
        message.senderId === userId ? "chat-end" : "chat-start"
      }`}
    >
      <li
        className={` group chat-bubble text-primary-content ${
          message.senderId === userId
            ? "chat-bubble-primary"
            : "chat-bubble-neutral"
        }`}
      >
        <div className="flex flex-row items-center justify-center">
          <div>
            {!isInEditMode && <p>{message.text}</p>}
            {isInEditMode && (
              <form onSubmit={handleSubmitEditedMessage}>
                <input
                  name="message"
                  defaultValue={message.text}
                  className="input"
                  required
                />
              </form>
            )}
            {message.isEdited && (
              <p className="text-[10px] text-primary-content/50">Edited</p>
            )}
          </div>
          {message.senderId === userId && (
            <div className="flex items-center justify-end transition-all duration-100">
              <div className="dropdown dropdown-open dropdown-left dropdown-end flex items-center justify-end">
                <button
                  type="button"
                  className="bg-primary border-0 shadow-none"
                  onClick={handleDropdown}
                >
                  <EllipsisVerticalIcon className="size-5" />
                </button>
                {activeDropdown === message._id && (
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-1 w-34 p-2 shadow-sm"
                  >
                    <MessageCopyButton message={message.text} />
                    <EditMessageButton handleEditMode={handleEditMessage} />
                    <DeleteMessageButton
                      messageId={message._id}
                      friendId={roomId ? roomId : ""}
                    />
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      </li>
    </div>
  );
};
