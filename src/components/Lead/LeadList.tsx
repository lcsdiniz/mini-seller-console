import { useEffect, useMemo, useState } from "react";
import type { Lead, Opportunity } from "../../types";
import { getLeads, updateLead } from "../../services/leadService";
import toast from "react-hot-toast";
import { createOpportunity } from "../../services/opportunityService";
import { Table } from "../Table";
import { LeadDetails } from "./LeadDetails";
import { NewOpportunity } from "../Opportinity/NewOpportunity";
import { leadTableHeaders } from "../../constants/table";

export default function LeadList() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);

  const [searchInput, setSearchInput] = useState("");
  const [filterInput, setFilterInput] = useState("all");
  const [sortInput, setSortInput] = useState<keyof Lead>("score");

  const [appliedSearch, setAppliedSearch] = useState("");
  const [appliedFilter, setAppliedFilter] = useState("all");
  const [appliedSort, setAppliedSort] = useState<keyof Lead>("score");

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [newOpportunity, setNewOpportunity] = useState<Opportunity | null>(
    null
  );

  useEffect(() => {
    fetchLeads();
  }, []);

  async function fetchLeads() {
    setLoading(true);
    try {
      const data = await getLeads();
      setLeads(data);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unexpected error loading leads."
      );
    } finally {
      setLoading(false);
    }
  }

  const processedData = useMemo(() => {
    let filtered = [...leads];

    if (appliedSearch) {
      filtered = filtered.filter(
        (lead) =>
          lead.name.toLowerCase().includes(appliedSearch.toLowerCase()) ||
          lead.company.toLowerCase().includes(appliedSearch.toLowerCase())
      );
    }

    if (appliedFilter !== "all") {
      filtered = filtered.filter(
        (lead) => lead.status.toLowerCase() === appliedFilter
      );
    }

    filtered.sort((a, b) => {
      if (appliedSort === "score") return b.score - a.score;
      if (appliedSort === "name") return a.name.localeCompare(b.name);
      if (appliedSort === "company") return a.company.localeCompare(b.company);
      return 0;
    });

    return filtered;
  }, [leads, appliedSearch, appliedFilter, appliedSort]);

  const handleUpdateLead = async (updatedLead: Lead) => {
    try {
      setLeads((prev) =>
        prev.map((l) => (l.id === updatedLead.id ? updatedLead : l))
      );
      await updateLead(updatedLead);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update lead."
      );
    } finally {
      setSelectedLead(null);
    }
  };

  const convertLead = async (opportunity: Opportunity) => {
    try {
      await createOpportunity(opportunity);
      setNewOpportunity(null);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to convert lead."
      );
    }
  };

  return (
    <>
      <header className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search leads..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="px-3 py-2 border rounded shadow w-1/2"
        />

        <select
          value={filterInput}
          onChange={(e) => setFilterInput(e.target.value)}
          className="px-3 py-2 border rounded shadow"
        >
          <option value="all">All Status</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
        </select>

        <select
          value={sortInput}
          onChange={(e) => setSortInput(e.target.value as keyof Lead)}
          className="px-3 py-2 border rounded shadow"
        >
          <option value="score">Score (desc)</option>
          <option value="name">Name (A-Z)</option>
          <option value="company">Company (A-Z)</option>
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
          headers={leadTableHeaders}
          data={processedData}
          clickableRows
          onRowClick={setSelectedLead}
          renderRow={(lead: Lead) => (
            <tr
              key={lead.id}
              className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
              onClick={() => setSelectedLead(lead)}
            >
              <td className="px-4 py-2">{lead.name}</td>
              <td className="px-4 py-2">{lead.company}</td>
              <td className="px-4 py-2">{lead.email}</td>
              <td className="px-4 py-2">{lead.score}</td>
              <td className="px-4 py-2">{lead.status}</td>
              <td className="px-4 py-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // 🔹 impede abrir slide-over
                    setNewOpportunity({
                      id: lead.id,
                      name: lead.name,
                      stage: "Prospecting",
                      accountName: lead.company,
                    });
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded shadow"
                >
                  Convert
                </button>
              </td>
            </tr>
          )}
        />
      )}

      {selectedLead && (
        <LeadDetails
          lead={selectedLead}
          isOpen={!!selectedLead}
          onClose={() => setSelectedLead(null)}
          onSave={handleUpdateLead}
        />
      )}

      {newOpportunity && (
        <NewOpportunity
          opportunity={newOpportunity}
          isOpen={!!newOpportunity}
          onClose={() => setNewOpportunity(null)}
          onCreate={convertLead}
        />
      )}
    </>
  );
}
