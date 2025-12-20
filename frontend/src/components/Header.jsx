export default function Header() {
  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="px-6 py-3 flex justify-between items-center">
        <span className="font-semibold text-[#1E40AF] text-lg flex items-center gap-2">
           EduDoc
        </span>

        <button
          onClick={() => {
            localStorage.removeItem("auth");
            window.location.href = "/";
          }}
          className="text-sm text-[#1E40AF] hover:underline"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
