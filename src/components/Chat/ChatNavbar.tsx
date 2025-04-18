type ChatNavbarProps = {
  username: string;
  profilePic: string;
  isOnline?: boolean;
};

export const ChatNavbar = ({
  username,
  profilePic,
  isOnline = false,
}: ChatNavbarProps) => {
  return (
    <div className="border-b border-base-300 p-2 flex flex-row gap-3 items-center justify-start">
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
