export type MessageType = {
  _id: string;
  receiverId: string;
  senderId: string;
  text: string;
  isEdited: boolean;
  createdAt: Date;
};
