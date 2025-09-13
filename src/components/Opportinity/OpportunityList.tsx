import { useEffect, useMemo, useState } from "react";
import type { Opportunity } from "../../types";
import { getOpportunities } from "../../services/opportunityService";
import toast from "react-hot-toast";
import { Table } from "../Table";
import { Button } from "../Button";
import { Select } from "../Select";
import { opportunityStageOptions, opportunityTableHeaders, sortOptions } from "../../constants";

export default function OpportunityList() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(false);

  const [searchInput, setSearchInput] = useState("");
  const [stageInput, setStageInput] = useState("all");
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

        <Select
          type="filter"
          options={opportunityStageOptions}
          value={stageInput}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStageInput(e.target.value as keyof Opportunity)}
        />

        <Select
          type="filter"
          options={sortOptions}
          value={sortInput}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSortInput(e.target.value as keyof Opportunity)}
        />

        <Button
          label="Apply"
          onClick={() => {
            setAppliedSearch(searchInput);
            setAppliedFilter(stageInput);
            setAppliedSort(sortInput);
          }}
        />
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
