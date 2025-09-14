import { useEffect, useMemo, useState } from "react";
import type { Opportunity } from "@/types";
import { getOpportunities } from "../services/opportunityService";
import toast from "react-hot-toast";
import { Select } from "@/components/ui/Select";
import { opportunityStageOptions, opportunityTableHeaders } from "../constants/index";
import { opportunituSortOptions } from "../constants/selectSort";
import Header from "@/components/layout/Header";
import SkeletonTable from "@/components/ui/Table/SkeletonTable";
import { Table } from "@/components/ui/Table/Table";

export default function OpportunityList() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(false);

  const [searchInput, setSearchInput] = useState("");
  const [stageInput, setStageInput] = useState("all");
  const [sortInput, setSortInput] = useState<keyof Opportunity>("stage");

  const [appliedSearch, setAppliedSearch] = useState("");
  const [appliedStage, setAppliedStage] = useState("all");
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

    if (appliedStage !== "all") {
      filtered = filtered.filter(
        (opp) => opp.stage.toLowerCase() === appliedStage
      );
    }

    filtered.sort((a, b) => {
      if (appliedSort === "name") return a.name.localeCompare(b.name);
      if (appliedSort === "accountName")
        return a.accountName.localeCompare(b.accountName);
      return 0;
    });

    return filtered;
  }, [opportunities, appliedSearch, appliedStage, appliedSort]);
  
  function applyFilters() {
    setAppliedSearch(searchInput);
    setAppliedStage(stageInput);
    setAppliedSort(sortInput);
  }

  return (
    <>
      <Header
        searchPlaceholder="Search opportunities..."
        searchValue={searchInput}
        onChangeSearch={(e: React.ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)}
        applyFilters={applyFilters}
      >
        <Select
          type="header"
          options={opportunityStageOptions}
          value={stageInput}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStageInput(e.target.value as keyof Opportunity)}
        />

        <Select
          type="header"
          options={opportunituSortOptions}
          value={sortInput}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSortInput(e.target.value as keyof Opportunity)}
        />
      </Header>

      {loading ? (
        <SkeletonTable
          headers={opportunityTableHeaders.map(h => h.label)}
        />
      ) : (
        <Table
          headers={opportunityTableHeaders}
          data={processedData}
          clickableRows
          renderRow={(opp: Opportunity) => (
            <tr
              key={opp.id}
              className="border-b bg-white border-gray-200 hover:bg-gray-100"
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
