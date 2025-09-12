import { useEffect, useState } from "react";
import { getLeads } from "../services/leadService";
import type { Lead } from "../types";

export default function LeadList() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [sort, setSort] = useState<string>("score");

  useEffect(() => {
    getLeads().then(setLeads);
  }, []);

  if (!leads.length) {
    return <p className="text-gray-500 dark:text-gray-400">No leads available.</p>;
  }

  function filteredLeads() {
    let filtered = [...leads];
    if (filter !== "all") {
      filtered = filtered.filter((lead) => lead.status.toLowerCase() === filter);
    }

    if (search) {
      filtered = filtered.filter(
        (lead) =>
          lead.name.toLowerCase().includes(search.toLowerCase()) ||
          lead.company.toLowerCase().includes(search.toLowerCase())
      );
    }

    return filtered.sort((a, b) => {
      if (sort === "score") {
        return b.score - a.score;
      } else if (sort === "name") {
        return a.name.localeCompare(b.name);
      } else if (sort === "company") {
        return a.company.localeCompare(b.company);
      }
      return 0;
    });
  }

  return (
    <>
      <header className="bg-white px-6 py-4 border-b flex items-center justify-between">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search leads..."
          className="w-1/2 rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
        />

        <div className="flex gap-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          >
            <option value="score">Score (desc)</option>
            <option value="name">Name (A-Z)</option>
            <option value="company">Company (A-Z)</option>
          </select>
        </div>
      </header>
      <div className="rounded-lg bg-white p-4 shadow-sm">
        <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-left text-gray-600 dark:text-gray-300">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Company</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Score</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads().map((lead) => (
                <tr
                  key={lead.id}
                  className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="px-4 py-2">{lead.name}</td>
                  <td className="px-4 py-2">{lead.company}</td>
                  <td className="px-4 py-2">{lead.email}</td>
                  <td className="px-4 py-2">{lead.score}</td>
                  <td className="px-4 py-2">{lead.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
