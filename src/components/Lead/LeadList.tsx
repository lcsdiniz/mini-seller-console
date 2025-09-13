import { useEffect, useMemo, useState } from "react";
import type { Lead, Opportunity } from "../../types";
import { getLeads, updateLead } from "../../services/leadService";
import toast from "react-hot-toast";
import { createOpportunity } from "../../services/opportunityService";
import { Table } from "../Table";
import { LeadDetails } from "./LeadDetails";
import { NewOpportunity } from "../Opportinity/NewOpportunity";
import { Select } from "../Select";
import { Button } from "../Button";
import { leadStatusOptions, leadTableHeaders } from "../../constants";
import { leadSortOptions } from "../../constants/lead/selectSort";
import Header from "../Header";

export default function LeadList() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);

  const [searchInput, setSearchInput] = useState("");
  const [statusInput, setStatusInput] = useState("all");
  const [sortInput, setSortInput] = useState<keyof Lead>("score");

  const [appliedSearch, setAppliedSearch] = useState("");
  const [appliedStatus, setAppliedStatus] = useState("all");
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

    if (appliedStatus !== "all") {
      filtered = filtered.filter(
        (lead) => lead.status.toLowerCase() === appliedStatus
      );
    }

    filtered.sort((a, b) => {
      if (appliedSort === "score") return b.score - a.score;
      if (appliedSort === "name") return a.name.localeCompare(b.name);
      if (appliedSort === "company") return a.company.localeCompare(b.company);
      return 0;
    });

    return filtered;
  }, [leads, appliedSearch, appliedStatus, appliedSort]);

  async function handleUpdateLead(updatedLead: Lead) {
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

  async function convertLead(opportunity: Opportunity){
    try {
      await createOpportunity(opportunity);
      setNewOpportunity(null);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to convert lead."
      );
    }
  };

  function applyFilters() {
    setAppliedSearch(searchInput);
    setAppliedStatus(statusInput);
    setAppliedSort(sortInput);
  }

  return (
    <>
      <Header
        searchPlaceholder="Search leads..."
        searchValue={searchInput}
        onChangeSearch={(e: React.ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)}
        applyFilters={applyFilters}
      >
        <Select
          type="header"
          options={leadStatusOptions}
          value={statusInput}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatusInput(e.target.value)}
        />
        
        <Select
          type="header"
          options={leadSortOptions}
          value={sortInput}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSortInput(e.target.value as keyof Lead)}
        />
      </Header>

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
                <Button
                  label="Convert"
                  onClick={(e) => {
                    e.stopPropagation();
                    setNewOpportunity({
                      id: lead.id,
                      name: lead.name,
                      stage: "Prospecting",
                      accountName: lead.company,
                    });
                  }}
                />
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
