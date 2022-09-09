import Chat from "../components/Home/Chat/Chat";
import Sidebar from "../components/Home/Sidebar/Sidebar";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) navigate("/login");
  }, [currentUser, navigate]);

  return (
    <div className="relative flex h-screen min-h-screen items-center justify-center bg-[#a7bcff]">
      <div className="container flex h-[80%] overflow-hidden rounded-lg border-[1px] border-white">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};
export default Home;
