import { UsersIcon, BriefcaseIcon } from "@heroicons/react/24/outline";
import { useLocation } from "react-router-dom";

const navItems = [
  { name: "Leads", href: "/", icon: UsersIcon },
  { name: "Opportunities", href: "/opportunities", icon: BriefcaseIcon },
];

export default function Topbar() {
  const location = useLocation();

  return (
    <header className="bg-white shadow-sm border-b px-6">
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-xl text-blue-600">Mini Seller Console</span>
        </div>

        <nav className="flex space-x-6">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center gap-1 text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              <item.icon className={`h-5 w-5 ${location.pathname === item.href ? "text-blue-600" : ""}`} />
              <span className={`${location.pathname === item.href ? "text-blue-600" : ""}`}>{item.name}</span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
