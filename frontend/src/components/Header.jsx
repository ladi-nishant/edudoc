export default function Header() {
  return (
    <header className="bg-white border-b">
      <div className="px-6 py-3 flex justify-between items-center">
        <span className="font-semibold text-[#005DAC] text-lg">
          EduDoc
        </span>

        <button
          onClick={() => {
            localStorage.removeItem("auth");
            window.location.href = "/";
          }}
          className="text-sm text-[#005DAC] hover:underline"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
