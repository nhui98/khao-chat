import ChatList from "../ChatList/ChatList";
import Navbar from "../Navbar/Navbar";
import Search from "../Search/Search";

const Sidebar = () => (
  <aside className="flex flex-1 flex-col border-r-[1px] border-r-[#3e3c61] bg-[#3e3c61]">
    <Navbar />
    <Search />
    <ChatList />
  </aside>
);

export default Sidebar;
