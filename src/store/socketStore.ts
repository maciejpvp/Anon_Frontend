import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import { MessageType } from "../types";

type ServerToClientEvents = {
  "new-message": (data: MessageType) => void;
};

type ClientToServerEvents = {
  sendMessage: (data: { user: string; text: string }) => void;
};

type SocketStore = {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
  connect: (userId: string) => void;
  disconnect: () => void;
};

export const useSocketStore = create<SocketStore>((set, get) => ({
  socket: null,

  connect: (userId) => {
    const { socket: isSocketConnected } = get();
    if (isSocketConnected) return;
    const socket = io("http://localhost:5001", {
      withCredentials: true,
      query: {
        userId,
      },
    });

    socket.on("connect", () => {
      console.log("🔌 Socket connected:", socket.id);
    });

    socket.on("new-message", (data) => {
      console.log(data);
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
    });

    set({ socket });
  },

  disconnect: () => {
    const socket = useSocketStore.getState().socket;
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },
}));
