import { useState } from "react";
import LeadList from "../components/LeadList";
import OpportunityList from "../components/OpportunityList";

export default function HomePage() {
  const [view, setView] = useState<"leads" | "opportunities">("leads");

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="px-6 py-4 border-b">
          <h1 className="text-lg font-bold text-gray-800">Mini Seller Console</h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setView("leads")}
            className={`w-full text-left px-4 py-2 rounded-lg ${
              view === "leads"
                ? "bg-blue-600 text-white shadow"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Leads
          </button>
          <button
            onClick={() => setView("opportunities")}
            className={`w-full text-left px-4 py-2 rounded-lg ${
              view === "opportunities"
                ? "bg-blue-600 text-white shadow"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Opportunities
          </button>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-y-auto p-6">
            {view === "leads" ? <LeadList /> : <OpportunityList />}
        </main>
      </div>
    </div>
  );
}
