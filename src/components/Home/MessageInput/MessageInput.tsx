import { BsPaperclip } from "react-icons/bs";
import { GrGallery } from "react-icons/gr";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useChat } from "../../../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../../firebase/firebase";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState<File | null>(null);

  const { currentUser } = useAuth();
  const { state } = useChat();

  const handleSend = async () => {
    if (!currentUser) return;

    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot);
        },
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", state.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser?.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", state.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser?.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [state.chatId + ".lastMessage"]: {
        text,
      },
      [state.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", state.user.uid), {
      [state.chatId + ".lastMessage"]: {
        text,
      },
      [state.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };

  return (
    <div className="mt-auto flex h-[70px] justify-between bg-white p-2">
      <input
        type="text"
        placeholder="Type something..."
        className="w-full text-lg text-[#2f2d52] outline-none placeholder:text-gray-300"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="flex items-center gap-x-4">
        <BsPaperclip className="h-[24px] cursor-pointer" />
        <input
          type="file"
          className="hidden"
          id="gallery"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0)
              setImg(e.target.files[0]);
          }}
        />
        <label htmlFor="galley">
          <GrGallery className="h-[24px] cursor-pointer" />
        </label>
        <button
          className="bg-[#8da4f1] py-2 px-6  text-white"
          onClick={handleSend}
        >
          send
        </button>
      </div>
    </div>
  );
};
export default MessageInput;
