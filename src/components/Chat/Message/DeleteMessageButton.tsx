import { TrashIcon } from "@heroicons/react/24/outline";
import { useDeleteMessage } from "../../../hooks/useDeleteMessage";
import { useState } from "react";
import { useDropdownStore } from "../../../store/dropdownStore";

type DeleteMessageButtonProps = {
  messageId: string;
  friendId: string;
};

export const DeleteMessageButton = ({
  messageId,
  friendId,
}: DeleteMessageButtonProps) => {
  const { deleteMessage } = useDeleteMessage(messageId, friendId);
  const [wantDelete, setWantDelete] = useState<boolean>(false);
  const closeDropdown = useDropdownStore((s) => s.closeDropdown);

  const handleConfirmDelete = () => {
    setWantDelete(true);
  };

  const handleDeleteMessage = () => {
    deleteMessage();
    closeDropdown();
  };

  return (
    <li>
      {!wantDelete && (
        <button onClick={handleConfirmDelete}>
          <TrashIcon className="size-4" />
          Delete
        </button>
      )}
      {wantDelete && (
        <button className="btn btn-error" onClick={handleDeleteMessage}>
          <TrashIcon className="size-4" />
          Confirm?
        </button>
      )}
    </li>
  );
};
