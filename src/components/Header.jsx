import { useState } from "react";
import { Menu, Search, Bell, Gem, X } from "lucide-react";

const GOLD_RATE = "13,385";

const Header = ({ setIsOpen }) => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 z-30 flex h-16 w-full items-center
      justify-between gap-2 border-b border-slate-200 bg-white px-3 shadow-sm sm:px-4 md:px-6"
    >
      {showSearch ? (
        <div className="flex w-full items-center gap-2 sm:hidden">
          <div className="flex flex-1 items-center gap-2 rounded-lg bg-gray-100 px-3 py-2">
            <Search size={17} className="shrink-0 text-gray-600" />
            <input
              autoFocus
              type="text"
              placeholder="Search schemes, customers"
              className="w-full bg-transparent text-sm font-bold text-gray-600 outline-none"
            />
          </div>
          <button
            onClick={() => setShowSearch(false)}
            aria-label="Close search"
            className="p-1 text-gray-600"
          >
            <X size={22} />
          </button>
        </div>
      ) : null}

      <div
        className={`min-w-0 items-center gap-2 ${
          showSearch ? "hidden sm:flex" : "flex"
        }`}
      >
        <Gem size={25} className="shrink-0 text-blue-900" />

        <div className="min-w-0 leading-tight">
          <h2 className="truncate text-base font-bold text-slate-800 sm:text-lg">
            Anaswara
          </h2>
          <p className="text-[8px] tracking-[3px] text-gray-500 sm:text-[9px]">
            JEWELLERS
          </p>
        </div>
      </div>

      <div
        className={`items-center gap-2 sm:gap-3 md:gap-6 ${
          showSearch ? "hidden sm:flex" : "flex"
        }`}
      >
        <div className="hidden items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 sm:flex">
          <Search size={17} className="shrink-0 text-gray-600" />
          <input
            type="text"
            placeholder="Search schemes, customers"
            className="w-28 bg-transparent text-xs font-bold text-gray-500 outline-none lg:w-48"
          />
        </div>
        <button
          onClick={() => setShowSearch(true)}
          aria-label="Open search"
          className="p-1 text-gray-600 sm:hidden"
        >
          <Search size={21} />
        </button>
        <div className="rounded-lg border-2 border-gold px-2 py-1 sm:rounded-xl sm:border-3 sm:p-1.5">
          <p className="whitespace-nowrap text-[10px] font-bold text-gold sm:text-xs">
            <span className="hidden sm:inline">Gold Rate : </span>₹{GOLD_RATE}
            <span className="hidden sm:inline"> / g</span>
            <span className="sm:hidden">/g</span>
          </p>
        </div>
        <button className="relative p-1" aria-label="Notifications">
          <Bell size={21} className="text-gray-600" />
        </button>
        <div className="hidden items-center gap-2 sm:flex">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black font-semibold text-white">
            A
          </div>

          <div className="hidden lg:block">
            <p className="text-xs text-gray-500">welcome back.</p>
            <p className="text-sm font-semibold">admin</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
          className="p-1 text-gray-700 lg:hidden"
        >
          <Menu size={25} />
        </button>
      </div>
    </header>
  );
};

export default Header;
