import { BsCameraVideoFill } from "react-icons/bs";
import { IoPersonAdd } from "react-icons/io5";
import { FiMoreHorizontal } from "react-icons/fi";
import { chatIcon } from "../../../styles/styles";
import Messages from "../Messages/Messages";
import MessageInput from "../MessageInput/MessageInput";
import { useChat } from "../../../context/ChatContext";

const Chat = () => {
  const { state } = useChat();

  return (
    <div className="flex flex-grow-[2] flex-col">
      <div className="flex h-[50px] items-center justify-between bg-[#5d5b8d] px-4 text-gray-100">
        <span>{state.user?.dislayName}</span>
        <div className="flex gap-4">
          <BsCameraVideoFill className={chatIcon} />
          <IoPersonAdd className={chatIcon} />
          <FiMoreHorizontal className={chatIcon} />
        </div>
      </div>
      <Messages />
      <MessageInput />
    </div>
  );
};

export default Chat;
