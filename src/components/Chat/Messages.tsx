import { useParams } from "react-router-dom";
import { useMessages } from "../../hooks/getMessages";
import { Message } from "./Message";
import { useEffect, useRef } from "react";
import { useSocketStore } from "../../store/socketStore";
import { useSocketMessage } from "../../hooks/useSocketMessage";
import { useAuthStore } from "../../store/authStore";
import { MessageType } from "../../types";
import { FullPageLoadingSpinner } from "../FullPageLoadingSpinner";

export const Messages = () => {
  const { roomId } = useParams();
  const user = useAuthStore((s) => s.user);
  const socket = useSocketStore((s) => s.socket);
  const {
    messages,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMessages(roomId ?? "");
  const { addMessage } = useSocketMessage();

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (data: MessageType) => {
      if (
        data.senderId === roomId ||
        (data.senderId === user?.userId && data.receiverId === roomId)
      ) {
        addMessage(data, roomId ?? "");
      }
    };

    socket?.on("new-message", handler);
    return () => {
      socket?.off("new-message", handler);
    };
  }, [socket, addMessage, roomId, user?.userId]);

  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    const loadMoreElement = loadMoreRef.current;

    observer.observe(loadMoreElement);

    return () => {
      if (loadMoreElement) observer.unobserve(loadMoreElement);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return <FullPageLoadingSpinner />;
  }

  return (
    <div className="h-[calc(100%-130px)] overflow-y-auto flex flex-col-reverse p-4 bg-base-200 rounded-box">
      {messages.length > 0 ? (
        <ul className="flex flex-col-reverse gap-2">
          {messages.map((message) => (
            <Message key={message._id} message={message} />
          ))}
          {hasNextPage && (
            <div
              ref={loadMoreRef}
              className="text-center text-sm text-gray-500 py-2"
            >
              {isFetchingNextPage ? "Loading more..." : "Load more..."}
            </div>
          )}
        </ul>
      ) : (
        <div className="h-full flex items-center justify-center text-lg">
          Start a new conversation
        </div>
      )}
    </div>
  );
};
