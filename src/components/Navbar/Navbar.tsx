import { useAuthStore } from "../../store/authStore";
import { UserCircleIcon } from "@heroicons/react/24/outline";

import { Logo } from "../Logo";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const clearUser = useAuthStore((s) => s.clearUser);

  const handleSettings = () => {
    navigate("/settings");
  };

  return (
    <div className="flex flex-row justify-between p-2 h-[45px] items-center">
      <Logo />
      <button
        className="btn anchor-button bg-base-100 border-0"
        popoverTarget="popover-1"
      >
        <UserCircleIcon className="size-8 " />
      </button>
      <ul
        className="dropdown dropdown-end menu w-32 rounded-box bg-base-100 shadow-sm anchor-list flex flex-col gap-2"
        popover="auto"
        id="popover-1"
      >
        <li>
          <button onClick={handleSettings} className="btn btn-xs btn-primary">
            <span className="text-sm">Settings</span>
          </button>
        </li>
        <li>
          <button onClick={clearUser} className="btn btn-xs btn-error">
            <span className="text-sm">Log Out</span>
          </button>
        </li>
      </ul>
    </div>
  );
};
