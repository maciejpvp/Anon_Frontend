import { useNavigate } from "react-router-dom";
import { FriendType } from "../../hooks/useFriendList";

type FriendListItemProps = {
  friend: FriendType;
};

export const FriendListItem = ({ friend }: FriendListItemProps) => {
  const navigate = useNavigate();

  const profilePic = friend.profilePic ? friend.profilePic : "/default.jpg";
  const handleSelectChat = () => {
    navigate(`/chat/${friend._id}`);
  };

  return (
    <div
      onClick={handleSelectChat}
      className="bg-base-300/60 grid grid-cols-[auto_1fr] items-center h-20 p-2 gap-4 rounded-sm"
    >
      <img
        src={profilePic}
        alt="Profile"
        className="rounded-full h-16 w-16 object-cover"
      />
      <p className="text-lg font-medium">{friend.username}</p>
    </div>
  );
};
