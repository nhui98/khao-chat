import { doc, DocumentData, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useChat } from "../../../context/ChatContext";
import { db } from "../../../firebase/firebase";

const ChatList = () => {
  const [chats, setChats] = useState<DocumentData | undefined>({});
  const { currentUser } = useAuth();
  const { dispatch } = useChat();

  useEffect(() => {
    if (!currentUser || !currentUser.uid) return;

    const unsub = onSnapshot(doc(db, "userChats", currentUser?.uid), (doc) => {
      setChats(doc.data());
    });

    return () => {
      unsub();
    };
  }, [currentUser]);

  const handleSelect = (user: any) => {
    dispatch({ type: "CHANGE_USER", payload: user });
  };

  return (
    <div className="">
      {chats &&
        Object.entries(chats)
          .sort((a, b) => b[1].date - a[1].date)
          .map((chat) => (
            <button
              className="flex cursor-pointer items-center gap-2 p-2 text-white transition-colors duration-500 hover:bg-[#2f2d52]"
              key={chat[0]}
              onClick={() => handleSelect(chat[1].userInfo)}
            >
              <img
                src={chat[1].userInfo.photoURL}
                alt=""
                className="h-[50px] w-[50px] rounded-full object-cover"
              />
              <div className="">
                <span className="text-lg font-medium">
                  {chat[1].userInfo.displayName}
                </span>
                <p>{chat[1].userInfo.lastMessage?.text}</p>
              </div>
            </button>
          ))}
    </div>
  );
};
export default ChatList;
