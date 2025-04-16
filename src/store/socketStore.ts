import { create } from "zustand";
import { io, Socket } from "socket.io-client";

type ServerToClientEvents = {
  message: (data: { user: string; text: string }) => void;
};

type ClientToServerEvents = {
  sendMessage: (data: { user: string; text: string }) => void;
};

type SocketStore = {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
  connect: () => void;
  disconnect: () => void;
};

export const useSocketStore = create<SocketStore>((set) => ({
  socket: null,

  connect: () => {
    const socket = io("http://localhost:5001", {
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("🔌 Socket connected:", socket.id);
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
