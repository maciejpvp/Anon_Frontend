import { useFriendList } from "../../hooks/useFriendList";
import { FriendListItem } from "./FriendListItem";

export const FriendList = () => {
  const { friends, isLoading } = useFriendList();

  if (isLoading) return <p>Loading</p>;

  return (
    <ul className="flex-col bg-base-200 w-full min-w-[150px] max-w-[300px] hidden sm:flex transition-all p-3">
      <h1 className="text-2xl font-semibold pb-4">Friend List</h1>
      {friends &&
        friends.map((friend) => (
          <FriendListItem key={friend._id} friend={friend} />
        ))}
    </ul>
  );
};
