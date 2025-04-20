import { useChatStore } from "../../store/chatStore";

type ChatNavbarProps = {
  profilePic: string;
  isOnline?: boolean;
};

export const ChatNavbar = ({
  profilePic,
  isOnline = false,
}: ChatNavbarProps) => {
  const username = useChatStore((s) => s.activeUsername);
  return (
    <div className="border-b border-base-300 p-2 flex flex-row gap-3 items-center justify-start h-[60px]">
      <img
        src={profilePic}
        alt="Profile"
        className="rounded-full h-10 w-10 object-cover"
      />
      <h2>
        {username} {isOnline}
      </h2>
    </div>
  );
};
