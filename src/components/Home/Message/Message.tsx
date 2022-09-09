import { useContext, useRef, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useChat } from "../../../context/ChatContext";

const owner = "flex-row-reverse";
const ownerParagraph = "bg-[#8da4f1] text-white rounded-lg rounded-tr-none";

const isOwner = true;

const Message = ({ message }: any) => {
  const { currentUser } = useContext(AuthContext);
  const { state } = useChat();

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      className={`mb-5 flex gap-5 ${
        message.senderId === currentUser?.uid && owner
      }`}
      ref={ref}
    >
      <div className="flex flex-col text-gray-500">
        <img
          src={
            message.senderId === currentUser?.uid
              ? currentUser?.photoURL
              : state.user.photoURL
          }
          alt=""
          className="h-[40px] w-[40px] rounded-full object-cover"
        />
        <span>just now</span>
      </div>
      <div className={`flex flex-col gap-2 ${isOwner && "items-end"}`}>
        <p
          className={` max-w-max bg-white py-2 px-4 ${
            message.senderId === currentUser?.uid
              ? ownerParagraph
              : "rounded-lg rounded-tl-none"
          }`}
        >
          {message.text}
        </p>
        {message.img && <img src={message.img} alt="" className="w-1/2" />}
      </div>
    </div>
  );
};

export default Message;
