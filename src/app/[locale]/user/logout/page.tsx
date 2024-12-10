"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useContext } from "react";
import LocaleContext from "../../_component/LocaleContext";
import { AuthActionsContext } from "@/services/auth/AuthContext";

export default function Logout() {
  const { logOut } = useContext(AuthActionsContext);
  const dict = useContext(LocaleContext);
  const router = useRouter();
  const handleLogout = async () => {
    await logOut();
    toast.success(dict.auth_message_logout_success);
    router.replace("/");
  };
  return (
    <div className="flex justify-center h-screen text-center">
      <div className="flex flex-row bg-gray-50 w-full p-3 h-[70px]">
        <div>
          <h3 className="mr-auto translate-y-[-2]">Logout</h3>
        </div>
        <button
          onClick={handleLogout}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded h-10 ml-auto"
        >
          Logout
        </button>
      </div>
      <div></div>
    </div>
  );
}
