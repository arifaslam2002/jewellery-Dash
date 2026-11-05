import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  CreditCard,
  Building2,
  CircleDollarSign,
  LogOut,
  X,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Customers", icon: Users },
  { name: "New Joinings", icon: UserPlus },
  { name: "Payment Entries", icon: CreditCard },
  { name: "Scheme Details", icon: Building2 },
  { name: "Gold Rate Report", icon: CircleDollarSign },
  { name: "User Management", icon: Users },
];

const Sidebar = ({ isOpen = false, onClose = () => {} }) => {
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  // Mobile drawer: close on Escape and stop the page behind from scrolling
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);

    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    const prevOverflow = document.body.style.overflow;
    if (isMobile) document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop (mobile / tablet only) */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-x-0 bottom-0 top-16 z-40 bg-black/40
        transition-opacity duration-300 lg:hidden
        ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />

      <aside
        aria-label="Main navigation"
        className={`fixed left-0 top-16 z-50 flex h-[calc(100dvh-4rem)]
        w-64 max-w-[80vw] flex-col border-r border-gray-200 bg-white
        shadow-xl transition-transform duration-300
        lg:w-48 lg:translate-x-0 lg:shadow-none
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Drawer header (mobile only), keeps the close button off the menu items */}
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 lg:hidden">
          <span className="text-sm font-bold text-slate-800">Menu</span>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-md p-1 text-gray-500 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto overscroll-contain px-3 py-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.name;

            return (
              <button
                key={item.name}
                aria-current={isActive ? "page" : undefined}
                onClick={() => {
                  setActiveMenu(item.name);
                  onClose();
                }}
                className={`flex w-full items-center gap-3 rounded-lg border-r-4
                px-3 py-3 text-left text-sm transition-colors
                ${
                  isActive
                    ? "border-slate-500 bg-slate-100 font-semibold text-slate-900"
                    : "border-transparent text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon size={18} className="shrink-0" />
                <span className="truncate">{item.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="border-t border-gray-100 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold text-red-500 hover:bg-red-50">
            <LogOut size={18} className="shrink-0" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
