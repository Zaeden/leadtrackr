import { Link, useLocation } from "react-router-dom";
import {
  MdOutlineSpaceDashboard,
  MdOutlineSettings,
  MdOutlineLeaderboard,
} from "react-icons/md";
import { LuUserPen } from "react-icons/lu";
import { RiChatFollowUpLine } from "react-icons/ri";
import { MdOutlineSubject } from "react-icons/md";
import Logout from "./Logout";

const Sidebar = () => {
  const location = useLocation();
  return (
    <nav className="border-r shadow w-64 bg-purple-900 flex flex-col">
      <h2 className="rounded-t-none bg-purple-950 rounded-2xl text-center text-xl text-white font-bold py-4 ">
        LeadTrackr
      </h2>
      <ul className="flex-1 mt-4 space-y-2 px-4">
        <li>
          <Link
            to="/dashboard"
            className={`flex items-center gap-2 py-2 px-3 rounded ${
              location.pathname === "/dashboard"
                ? "bg-white text-purple-600"
                : "text-white hover:bg-purple-700"
            }`}
          >
            <MdOutlineSpaceDashboard className="text-2xl" />
            <span className="text-sm font-semibold">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link
            to="/leads"
            className={`flex items-center gap-2 py-2 px-3 rounded ${
              location.pathname === "/leads"
                ? "bg-white text-purple-600"
                : "text-white hover:bg-purple-700"
            }`}
          >
            <MdOutlineLeaderboard className="text-2xl" />
            <span className="text-sm font-semibold">Lead Management</span>
          </Link>
        </li>
        <li>
          <Link
            to="/users"
            className={`flex items-center gap-2 py-2 px-3 rounded ${
              location.pathname === "/users"
                ? "bg-white text-purple-600"
                : "text-white hover:bg-purple-700"
            }`}
          >
            <LuUserPen className="text-2xl" />
            <span className="text-sm font-semibold">User Management</span>
          </Link>
        </li>

        <li>
          <Link
            to="/courses"
            className={`flex items-center gap-2 py-2 px-3 rounded ${
              location.pathname === "/courses"
                ? "bg-white text-purple-600"
                : "text-white hover:bg-purple-700"
            }`}
          >
            <MdOutlineSubject className="text-2xl" />
            <span className="text-sm font-semibold">Course Management</span>
          </Link>
        </li>
        <li>
          <Link
            to="/follow-ups"
            className={`flex items-center gap-2 py-2 px-3  rounded ${
              location.pathname === "/follow-ups"
                ? "bg-white text-purple-600"
                : "text-white hover:bg-purple-700"
            }`}
          >
            <RiChatFollowUpLine className="text-2xl" />
            <span className="text-sm font-semibold">Follow-Ups</span>
          </Link>
        </li>
        <li>
          <Link
            to="/settings"
            className={`flex items-center gap-2 py-2 px-3 rounded ${
              location.pathname === "/settings"
                ? "bg-white text-purple-600"
                : "text-white hover:bg-purple-700"
            }`}
          >
            <MdOutlineSettings className="text-2xl" />
            <span className="text-sm font-semibold">Settings</span>
          </Link>
        </li>
      </ul>
      <div className="p-4 border-t border-gray-700">
        <Logout />
      </div>
    </nav>
  );
};

export default Sidebar;
