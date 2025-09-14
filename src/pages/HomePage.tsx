import AppRoutes from "../routes/AppRoutes";
import Topbar from "../components/layout/Topbar";

export default function HomePage() {
  
  return (
    <>
      <Topbar />
      <div className="flex h-screen bg-gray-100">
        <div className="flex-1 flex flex-col">
          <main className="flex-1 overflow-y-auto p-6 sm:p-4 xs:p-2">
            <AppRoutes />
          </main>
        </div>
      </div>
    </>
  );
}
