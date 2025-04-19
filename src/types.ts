export type MessageType = {
  _id: string;
  receiverId: string;
  senderId: string;
  text: string;
  createdAt: Date;
};

export interface ServerToClientEvents {
  "new-message": (data: MessageType) => void;
}
