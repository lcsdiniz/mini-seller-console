import { useEffect, useState } from "react";
import { getOpportunities } from "../services/opportunityService";
import type { Opportunity } from "../types";
import toast from "react-hot-toast";

export default function OpportunityList() {
  const [loading, setLoading] = useState(false);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getOpportunities().then(setOpportunities);
  }, []);

  useEffect(() => {
    fetchOpportunities();
  }, []);

  if (loading) {
    return <p className="text-gray-500 dark:text-gray-400">Loading...</p>;
  }

  async function fetchOpportunities() {
    setLoading(true);
    try {
      const data = await getOpportunities();
      setOpportunities(data);
    } catch (error) {
      toast.dismiss();
      toast.error(error instanceof Error ? error.message : "Unexpected error while loading opportunities.");
    } finally {
      setLoading(false);
    }
  }

  function filteredOpportunities() {
    let filtered = [...opportunities];
    if (search) {
      filtered = filtered.filter((lead) =>
        lead.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    return filtered;
  }

  function renderOpportunities() {
    if (opportunities.length === 0) {
      return (
        <tr>
          <td
            colSpan={6}
            className="text-center text-gray-500 dark:text-gray-400 py-4"
          >
            No opportunities available.
          </td>
        </tr>
      );
    }

    return (
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700 text-left text-gray-600 dark:text-gray-300">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Stage</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Account</th>
          </tr>
        </thead>
        <tbody>
          {filteredOpportunities().map((opp) => (
            <tr
              key={opp.id}
              className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <td className="px-4 py-2">{opp.name}</td>
              <td className="px-4 py-2">{opp.stage}</td>
              <td className="px-4 py-2">{opp.amount ?? "-"}</td>
              <td className="px-4 py-2">{opp.accountName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <>
      <header className="bg-white px-6 py-4 border-b flex items-center justify-between">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search opportunities..."
          className="w-1/2 rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
        {/* 
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
        </div> */}
      </header>
      <div className="rounded-lg bg-white p-4 shadow-sm">
        {renderOpportunities()}
      </div>
    </>
  );
}
