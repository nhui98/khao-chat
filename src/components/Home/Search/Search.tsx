import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { KeyboardEvent, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { db } from "../../../firebase/firebase";

const Search = () => {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState<DocumentData | null>(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useAuth();

  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("name", "==", search));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      setErr(true);
    }
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    if (!currentUser || !user) return;

    const combinedId =
      currentUser.uid > user.id
        ? currentUser.uid + user?.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uuid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      setErr(true);
    }

    setUser(null);
    setSearch("");
  };

  return (
    <div className="border-b-[1px] border-b-gray-500">
      <div className="p-2">
        <input
          type="text"
          placeholder="find a user"
          className="border-none bg-transparent py-2 text-white outline-none placeholder:text-gray-400"
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKey}
          value={search}
        />
      </div>
      {err && <span>user not found.</span>}
      {user && (
        <button
          className="flex w-full cursor-pointer items-center gap-2 p-2 hover:bg-[#2f2d52]"
          onClick={handleSelect}
        >
          <img
            src={user.photoURL}
            alt="user"
            className="w-[50px] rounded-full border-none bg-transparent object-cover py-2 text-white outline-none placeholder:text-gray-400"
          />
          <div>
            <span className="text-sm font-medium">{user.displayName}</span>
          </div>
        </button>
      )}
    </div>
  );
};

export default Search;
