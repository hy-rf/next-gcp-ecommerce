"use client";
export default function Logout() {
  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/";
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
