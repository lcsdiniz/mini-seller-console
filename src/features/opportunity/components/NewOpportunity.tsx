import { useState, useEffect } from "react";
import type { Opportunity } from "../../../types";
import SlideOver from "../../../components/layout/SlideOver";

type NewOpportunityProps = {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onCreate: (opportunity: Opportunity) => void;
  readonly opportunity: Opportunity;
};

export function NewOpportunity({ isOpen, onClose, onCreate, opportunity }: NewOpportunityProps) {
  const [form, setForm] = useState<Opportunity>({
    id: opportunity.id,
    name: opportunity.name,
    stage: opportunity.stage || "Prospecting",
    accountName: "",
    amount: undefined,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setForm({
      id: opportunity.id,
      name: opportunity.name,
      stage: opportunity.stage || "Prospecting",
      accountName: "",
      amount: undefined,
    });
    setErrors({});
  }, [opportunity, isOpen]);

  const handleChange = (key: keyof Opportunity, value: string | number | undefined) => {
    setForm((prev) => ({ ...prev, [key]: value }));

    if (key === "accountName" && !value) {
      setErrors((prev) => ({ ...prev, [key]: "This field is required" }));
    } else {
      setErrors((prev) => {
        const { [key]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const isSaveDisabled = !form.accountName || Object.keys(errors).length > 0;

  const save = () => {
    if (!form.accountName) {
      setErrors({ accountName: "This field is required" });
      return;
    }

    onCreate(form);
    onClose();
  };

  return (
    <SlideOver
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={save}
      submitLabel="Create"
      title="New Opportunity"
      isSubmitDisabled={isSaveDisabled}
    >
      <div className="space-y-4">
        <div>
          <strong>ID:</strong>
          <input
            type="text"
            value={form.id}
            disabled
            className="border rounded-md px-2 py-1 w-full mt-1 bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <strong>Name:</strong>
          <input
            type="text"
            value={form.name}
            disabled
            className="border rounded-md px-2 py-1 w-full mt-1 bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <strong>Stage:</strong>
          <select
            value={form.stage}
            onChange={(e) => handleChange("stage", e.target.value)}
            className="border rounded-md px-2 py-1 w-full mt-1"
          >
            <option value="Prospecting">Prospecting</option>
            <option value="Qualification">Qualification</option>
            <option value="Proposal">Proposal</option>
            <option value="Closed Won">Closed Won</option>
            <option value="Closed Lost">Closed Lost</option>
          </select>
        </div>

        <div>
          <strong>Account Name:</strong>
          <input
            type="text"
            value={form.accountName}
            onChange={(e) => handleChange("accountName", e.target.value)}
            className={`border rounded-md px-2 py-1 w-full mt-1 ${errors.accountName ? "border-red-500" : ""}`}
          />
          {errors.accountName && <p className="text-red-500 mt-1">{errors.accountName}</p>}
        </div>

        <div>
          <strong>Amount (optional):</strong>
          <input
            type="number"
            value={form.amount ?? ""}
            onChange={(e) =>
              handleChange("amount", e.target.value ? Number(e.target.value) : undefined)
            }
            className="border rounded-md px-2 py-1 w-full mt-1"
          />
        </div>
      </div>
    </SlideOver>
  );
}
