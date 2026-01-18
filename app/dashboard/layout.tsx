import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      {/* <aside className="flex flex-col w-[20%] border-r border-gray-200 bg-neutral-50 h-screen overflow-y-auto">
        <div className="p-2 border-b border-gray-200 ">
          <h1 className="font-semibold text-xl px-4">History</h1>
        </div>
        <div className="flex p-2 flex-col gap-3">// History</div>
      </aside> */}
      <div className="w-full h-screen px-4 py-2 overflow-y-auto">{children}</div>
    </div>
  );
};

export default DashboardLayout;
