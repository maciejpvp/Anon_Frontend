import { PencilIcon } from "@heroicons/react/24/outline";

type EditMessageButtonProps = {
  handleEditMode: () => void;
};

export const EditMessageButton = ({
  handleEditMode,
}: EditMessageButtonProps) => {
  return (
    <li>
      <button onClick={handleEditMode}>
        <PencilIcon className="size-4" />
        Edit
      </button>
    </li>
  );
};
