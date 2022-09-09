import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useChat } from "../../../context/ChatContext";
import { db } from "../../../firebase/firebase";
import Message from "../Message/Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { state } = useChat();

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", state.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unsub();
    };
  }, [state]);

  return (
    <div className="h-[calc(100%-120px)] overflow-y-scroll bg-[#ddddf7] p-2">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
