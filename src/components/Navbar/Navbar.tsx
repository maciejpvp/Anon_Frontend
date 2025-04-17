import { useAuthStore } from "../../store/authStore";

import { Logo } from "../Logo";

export const Navbar = () => {
  const user = useAuthStore((s) => s.user);
  const clearUser = useAuthStore((s) => s.clearUser);

  return (
    <div className="flex flex-row justify-between p-2 h-[45px]">
      <Logo />
      {user && (
        <button onClick={clearUser} className="btn btn-xs btn-warning">
          <span className="text-sm">Log Out</span>
        </button>
      )}
    </div>
  );
};
