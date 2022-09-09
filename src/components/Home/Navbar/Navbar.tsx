import { signOut } from "firebase/auth";
import { useAuth } from "../../../context/AuthContext";
import { auth } from "../../../firebase/firebase";

const Navbar = () => {
  const { currentUser } = useAuth();

  return (
    <div className="flex h-[50px] w-full items-center justify-between bg-[#2f2d52] p-2 text-[#ddddf7]">
      <span className="font-bold">Khao Chat</span>
      <div className="flex gap-2">
        {currentUser?.photoURL && (
          <img
            src={currentUser.photoURL}
            alt="avatar"
            className="h-[24px] w-[24px] rounded-full bg-[#ddddf7] object-cover"
          />
        )}
        <span>{currentUser?.displayName}</span>
        <button
          className="bg-[#5d5b8d] px-2 text-xs"
          onClick={() => signOut(auth)}
        >
          logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
