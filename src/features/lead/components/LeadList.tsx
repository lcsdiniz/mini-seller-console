import { useEffect, useMemo, useState } from "react";
import type { Lead, Opportunity } from "@/types";
import { getLeads, updateLead } from "@/features/lead/services/leadService";
import toast from "react-hot-toast";
import { createOpportunity } from "@/features/opportunity/services/opportunityService";
import { Table } from "@/components/ui/Table/Table";
import { LeadDetails } from "./LeadDetails";
import { NewOpportunity } from "../../opportunity/components/NewOpportunity";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import {
  leadStatusOptions,
  leadTableHeaders,
} from "../constants";
import { leadSortOptions } from "../constants/selectSort";
import Header from "@/components/layout/Header";
import SkeletonTable from "@/components/ui/Table/SkeletonTable";
import { STORAGE_KEYS } from "@/constants/storage/keys";

export default function LeadList() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);

  const [searchInput, setSearchInput] = useState("");
  const [statusInput, setStatusInput] = useState(() => {
    const savedStatus = localStorage.getItem(STORAGE_KEYS.leadStatus);
    return savedStatus || "all";
  });
  const [sortInput, setSortInput] = useState<keyof Lead>(() => {
    const savedSort = localStorage.getItem(STORAGE_KEYS.leadSort);
    return (savedSort as keyof Lead) || "score";
  });

  const [appliedSearch, setAppliedSearch] = useState(searchInput);
  const [appliedStatus, setAppliedStatus] = useState(statusInput);
  const [appliedSort, setAppliedSort] = useState<keyof Lead>(sortInput);

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
    const previousLeads = [...leads];
    setLeads((prev) =>
      prev.map((lead) => (lead.id === updatedLead.id ? updatedLead : lead))
    );
    try {
      await updateLead(updatedLead);
      toast.success("Lead updated successfully.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update lead."
      );
      setLeads(previousLeads);
    } finally {
      setSelectedLead(null);
    }
  }

  async function convertLead(opportunity: Opportunity) {
    try {
      await createOpportunity(opportunity);
      toast.success("Lead converted successfully.");
      setNewOpportunity(null);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to convert lead."
      );
    }
  }

  function applyFilters() {
    setAppliedSearch(searchInput);
    setAppliedStatus(statusInput);
    localStorage.setItem(STORAGE_KEYS.leadStatus, statusInput);
    setAppliedSort(sortInput);
    localStorage.setItem(STORAGE_KEYS.leadSort, sortInput);
  }

  return (
    <>
      <Header
        searchPlaceholder="Search leads..."
        searchValue={searchInput}
        onChangeSearch={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchInput(e.target.value)
        }
        applyFilters={applyFilters}
      >
        <Select
          type="header"
          options={leadStatusOptions}
          value={statusInput}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setStatusInput(e.target.value)
          }
        />

        <Select
          type="header"
          options={leadSortOptions}
          value={sortInput}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setSortInput(e.target.value as keyof Lead)
          }
        />
      </Header>

      {loading ? (
        <SkeletonTable headers={leadTableHeaders.map((h) => h.label)} />
      ) : (
        <Table
          headers={leadTableHeaders}
          data={processedData}
          clickableRows
          onRowClick={setSelectedLead}
          renderRow={(lead: Lead) => (
            <tr
              key={lead.id}
              className="border-b border-gray-200 bg-white hover:bg-gray-100 cursor-pointer"
              onClick={() => setSelectedLead(lead)}
            >
              <td className="px-4 py-2">{lead.name}</td>
              <td className="px-4 py-2 hidden md:table-cell">{lead.company}</td>
              <td className="px-4 py-2 hidden lg:table-cell">{lead.email}</td>
              <td className="px-4 py-2">{lead.score}</td>
              <td className="px-4 py-2 capitalize">{lead.status}</td>
              <td className="px-4 py-2">
                <Button
                  label="Convert"
                  paddingX={2}
                  paddingY={1}
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
          onUpdate={handleUpdateLead}
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
