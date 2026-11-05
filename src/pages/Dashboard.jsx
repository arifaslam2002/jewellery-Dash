import {
  Users,
  Wallet,
  RotateCw,
  Globe,
  WalletCards,
  CircleDollarSign,
} from "lucide-react";

import StatCard from "../components/StatCard";
import Charts from "../components/Charts";

const Dashboard = () => {
  return (
    <div className="min-w-0">
      {/* Page header */}
      <div className="mb-4 rounded-md border border-slate-200 bg-white p-3 sm:mb-6 sm:p-3.5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <h1 className="text-lg font-black text-slate-800 sm:text-xl">
              Dashboard Overview
            </h1>
            <p className="mt-1 text-[11px] font-bold leading-snug text-gray-400 sm:text-xs">
              Thursday, November 5, 2026. Welcome to Anaswara Scheme Management
            </p>
          </div>

          <div className="flex items-stretch gap-2 sm:gap-3">
            <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-md bg-amber-500 p-1.5 text-xs font-black sm:flex-none sm:text-sm">
              <Globe size={15} className="shrink-0" />
              <span className="truncate text-red-700">
                Today's Gold: ₹13,385/g
              </span>
            </div>
            <button
              aria-label="Refresh"
              className="flex shrink-0 items-center justify-center rounded-md border border-gray-200 px-2.5 hover:bg-slate-50"
            >
              <RotateCw size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
        <StatCard
          icon={<Wallet size={15} />}
          title="Collections"
          fulltitle="TOTAL COLLECTIONS"
          value="₹20,43,010"
          color="bg-green-100 text-green-600"
          textColor="text-green-600"
          para="1,260 payments processed"
        />

        <StatCard
          fulltitle="CUSTOMER ACCOUNTS"
          title="Customers"
          value="1,808"
          icon={<Users size={15} />}
          color="bg-blue-100 text-blue-600"
          textColor="text-black"
          para="22% enrolled (394 joined)"
        />

        <StatCard
          fulltitle="SCHEME ENROLLMENTS"
          title="Schemes"
          value="406"
          icon={<WalletCards size={15} />}
          color="bg-orange-100 text-orange-600"
          textColor="text-orange-600"
          para="Total active saving plans"
        />

        <StatCard
          fulltitle="GOLD BOARD RATE"
          title="+295"
          value="₹13,385"
          icon={<CircleDollarSign size={15} />}
          color="bg-amber-100 text-red-700"
          textColor="text-orange-800"
          para="per gram standard rate"
          highlightTitle={true}
        />
      </div>

      <Charts />
    </div>
  );
};

export default Dashboard;
