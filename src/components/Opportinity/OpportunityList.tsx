import { useEffect, useMemo, useState } from "react";
import type { Opportunity } from "../../types";
import { getOpportunities } from "../../services/opportunityService";
import toast from "react-hot-toast";
import { Table } from "../Table";
import { opportunityTableHeaders } from "../../constants/table";

export default function OpportunityList() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(false);

  const [searchInput, setSearchInput] = useState("");
  const [filterInput, setFilterInput] = useState("all");
  const [sortInput, setSortInput] = useState<keyof Opportunity>("stage");

  const [appliedSearch, setAppliedSearch] = useState("");
  const [appliedFilter, setAppliedFilter] = useState("all");
  const [appliedSort, setAppliedSort] = useState<keyof Opportunity>("stage");

  useEffect(() => {
    fetchOpportunities();
  }, []);

  async function fetchOpportunities() {
    setLoading(true);
    try {
      const data = await getOpportunities();
      setOpportunities(data);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unexpected error loading opportunities."
      );
    } finally {
      setLoading(false);
    }
  }

  const processedData = useMemo(() => {
    let filtered = [...opportunities];

    if (appliedSearch) {
      filtered = filtered.filter(
        (opp) =>
          opp.name.toLowerCase().includes(appliedSearch.toLowerCase()) ||
          opp.accountName.toLowerCase().includes(appliedSearch.toLowerCase())
      );
    }

    if (appliedFilter !== "all") {
      filtered = filtered.filter(
        (opp) => opp.stage.toLowerCase() === appliedFilter
      );
    }

    filtered.sort((a, b) => {
      if (appliedSort === "name") return a.name.localeCompare(b.name);
      if (appliedSort === "accountName")
        return a.accountName.localeCompare(b.accountName);
      return 0;
    });

    return filtered;
  }, [opportunities, appliedSearch, appliedFilter, appliedSort]);

  return (
    <>
      <header className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search opportunities..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="px-3 py-2 border rounded shadow w-1/2"
        />

        <select
          value={filterInput}
          onChange={(e) => setFilterInput(e.target.value)}
          className="px-3 py-2 border rounded shadow"
        >
          <option value="all">All Stages</option>
          <option value="Prospecting">Prospecting</option>
          <option value="Negotiation">Negotiation</option>
          <option value="Closed Won">Closed Won</option>
          <option value="Closed Lost">Closed Lost</option>
        </select>

        <select
          value={sortInput}
          onChange={(e) => setSortInput(e.target.value as keyof Opportunity)}
          className="px-3 py-2 border rounded shadow"
        >
          <option value="name">Name (A-Z)</option>
          <option value="accountName">Account Name (A-Z)</option>
          <option value="stage">Stage</option>
        </select>

        <button
          onClick={() => {
            setAppliedSearch(searchInput);
            setAppliedFilter(filterInput);
            setAppliedSort(sortInput);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded shadow"
        >
          Apply
        </button>
      </header>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table
          headers={opportunityTableHeaders}
          data={processedData}
          clickableRows
          renderRow={(opp: Opportunity) => (
            <tr
              key={opp.id}
              className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
            >
              <td className="px-4 py-2">{opp.name}</td>
              <td className="px-4 py-2">{opp.accountName}</td>
              <td className="px-4 py-2">{opp.stage}</td>
              <td className="px-4 py-2">{opp.amount}</td>
            </tr>
          )}
        />
      )}
    </>
  );
}
