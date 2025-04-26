import { CheckIcon, ClipboardIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

type MessageCopyButtonProps = {
  message: string;
};

export const MessageCopyButton = ({ message }: MessageCopyButtonProps) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <li>
      <button onClick={handleCopy}>
        {copied ? (
          <CheckIcon className="size-4" />
        ) : (
          <ClipboardIcon className="size-4" />
        )}
        {copied ? "Copied" : "Copy"}
      </button>
    </li>
  );
};
