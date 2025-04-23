import { useNavigate, useParams } from "react-router-dom";
import { FriendType } from "../../hooks/useFriendList";
import { useChatStore } from "../../store/chatStore";

type FriendListItemProps = {
  friend: FriendType;
};

export const FriendListItem = ({ friend }: FriendListItemProps) => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const setActiveChatUsername = useChatStore((s) => s.setActiveUsername);

  const profilePic = friend.profilePic ? friend.profilePic : "/default.jpg";
  const handleSelectChat = () => {
    setActiveChatUsername(friend.username);
    navigate(`/chat/${friend._id}`);
  };

  return (
    <button
      onClick={handleSelectChat}
      className={`grid grid-cols-[auto_1fr] items-center h-20 p-2 gap-4 rounded-sm transition-all duration-300 ${
        roomId === friend._id ? "bg-base-300" : ""
      }`}
    >
      <img
        src={profilePic}
        alt="Profile"
        className="rounded-full h-16 w-16 object-cover"
      />
      <p className="text-lg font-medium">{friend.username}</p>
    </button>
  );
};
