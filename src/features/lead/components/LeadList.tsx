import { useEffect, useMemo, useState } from "react";
import type { Lead, Opportunity } from "@/types";
import { getLeads, updateLead } from "@/features/lead/services/leadService";
import toast from "react-hot-toast";
import { createOpportunity } from "@/features/opportunity/services/opportunityService";
import { Table } from "@/components/ui/Table/Table";
import { LeadDetails } from "./LeadDetails";
import { NewOpportunity } from "../../opportunity/components/NewOpportunity";
import { Select } from "@/components/ui/Select";
import { leadStatusOptions, leadTableHeaders } from "../constants";
import { leadSortOptions } from "../constants/selectSort";
import Header from "@/components/layout/Header";
import SkeletonTable from "@/components/ui/Table/SkeletonTable";
import { STORAGE_KEYS } from "@/constants/storage/keys";
import { LeadRow } from "./LeadRow";
import { LeadCard } from "./LeadCard";
import Spinner from "@/components/ui/Spinner";

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
  const [newOpportunity, setNewOpportunity] = useState<Opportunity | null>(null);

  const [visibleCount, setVisibleCount] = useState(10); // inicial mobile
  const increment = 10;
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    fetchLeads();
  }, []);

  async function fetchLeads() {
    setLoading(true);
    try {
      const data = await getLeads();
      setLeads(data);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unexpected error loading leads.");
    } finally {
      setLoading(false);
    }
  }

  function filterAndSortLeads(
    leads: Lead[],
    search: string,
    status: string,
    sort: keyof Lead
  ) {
    let filtered = [...leads];
    if (search) {
      filtered = filtered.filter(
        (lead) =>
          lead.name.toLowerCase().includes(search.toLowerCase()) ||
          lead.company.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (status !== "all") {
      filtered = filtered.filter((lead) => lead.status.toLowerCase() === status);
    }
    filtered.sort((a, b) => {
      if (sort === "score") return b.score - a.score;
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "company") return a.company.localeCompare(b.company);
      return 0;
    });
    return filtered;
  }

  const processedData = useMemo(
    () => filterAndSortLeads(leads, appliedSearch, appliedStatus, appliedSort),
    [leads, appliedSearch, appliedStatus, appliedSort]
  );

  useEffect(() => {
    const container = document.getElementById("scroll-container");
    if (!container) return;

    const handleScroll = () => {
      if (
        container.scrollTop + container.clientHeight >= container.scrollHeight - 50 &&
        visibleCount < processedData.length &&
        !loadingMore
      ) {
        setLoadingMore(true);
        setTimeout(() => {
          setVisibleCount((prev) => Math.min(prev + increment, processedData.length));
          setLoadingMore(false);
        }, 500);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [visibleCount, processedData.length, loadingMore]);

  async function handleUpdateLead(updatedLead: Lead) {
    const previousLeads = [...leads];
    setLeads((prev) => prev.map((lead) => (lead.id === updatedLead.id ? updatedLead : lead)));
    try {
      await updateLead(updatedLead);
      toast.success("Lead updated successfully.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update lead.");
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
      toast.error(error instanceof Error ? error.message : "Failed to convert lead.");
    }
  }

  function applyFilters() {
    setAppliedSearch(searchInput);
    setAppliedStatus(statusInput);
    localStorage.setItem(STORAGE_KEYS.leadStatus, statusInput);
    setAppliedSort(sortInput);
    localStorage.setItem(STORAGE_KEYS.leadSort, sortInput);
    setVisibleCount(10);
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
        <SkeletonTable headers={leadTableHeaders.map((h) => h.label)} />
      ) : (
        <>
          <div className="hidden md:block">
            <Table
              headers={leadTableHeaders}
              data={processedData}
              clickableRows
              onRowClick={setSelectedLead}
              renderRow={(lead) => (
                <LeadRow
                  key={lead.id}
                  lead={lead}
                  onSelect={setSelectedLead}
                  onUpdate={handleUpdateLead}
                  onConvert={(lead) =>
                    setNewOpportunity({
                      id: lead.id,
                      name: lead.name,
                      stage: "Prospecting",
                      accountName: lead.company,
                    })
                  }
                />
              )}
            />
          </div>

          <div
            className="block md:hidden h-[80vh] overflow-auto"
            id="scroll-container"
          >
            {processedData.slice(0, visibleCount).map((lead) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                onSelect={setSelectedLead}
                onUpdate={handleUpdateLead}
                onConvert={(lead) =>
                  setNewOpportunity({
                    id: lead.id,
                    name: lead.name,
                    stage: "Prospecting",
                    accountName: lead.company,
                  })
                }
              />
            ))}

            {loadingMore && (
              <Spinner />
            )}
          </div>
        </>
      )}

      {selectedLead && (
        <LeadDetails lead={selectedLead} isOpen={!!selectedLead} onClose={() => setSelectedLead(null)} />
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
