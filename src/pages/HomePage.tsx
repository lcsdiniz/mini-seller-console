import { Link, useLocation } from "react-router-dom";
import AppRoutes from "../routes/AppRoutes";

export default function HomePage() {
  const location = useLocation();
  
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="px-6 py-4 border-b">
          <h1 className="text-lg font-bold text-gray-800">Mini Seller Console</h1>
        </div>

        <nav className="flex flex-col gap-1 p-4 space-y-2">
          <Link to="/leads" className="text-blue-600 hover:underline" style={{ textDecoration: 'none' }}>
            <div
              className={`w-full text-left px-4 py-2 rounded-lg cursor-pointer ${
                location.pathname === "/" ||  location.pathname === "/leads"
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Leads
            </div>
          </Link>
          <Link to="/opportunities" className="text-blue-600 hover:underline" style={{ textDecoration: 'none' }}>
            <div
              className={`w-full text-left px-4 py-2 rounded-lg cursor-pointer ${
                location.pathname === "/opportunities"
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Opportunities
            </div>
          </Link>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-y-auto p-6">
          <AppRoutes />
        </main>
      </div>
    </div>
  );
}
