import { useState } from "react";
import type { Lead } from "../../types";
import SlideOver from "../SlideOver";
import { leadStatusOptions } from "../../constants/select";
import { Select } from "../Select";

type LeadDetailsProps = {
  lead: Lead;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedLead: Lead) => void;
};

export function LeadDetails({
  lead,
  isOpen,
  onClose,
  onSave,
}: LeadDetailsProps) {
  const [editingLead, setEditingLead] = useState<Lead>(lead);
  const [error, setError] = useState("");

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleEmailChange = (value: string) => {
    setEditingLead((prev) => (prev ? { ...prev, email: value } : prev));
    setError(!validateEmail(value) ? "Email inválido!" : "");
  };

  const saveEditing = () => {
    if (!validateEmail(editingLead.email)) return;
    onSave(editingLead);
    onClose();
  };

  const isSaveDisabled =
    !editingLead ||
    error !== "" ||
    (editingLead.email === lead.email && editingLead.status === lead.status);

  return (
    <SlideOver
      isOpen={isOpen}
      onClose={onClose}
      onSave={saveEditing}
      title="Lead Details"
      isSaveDisabled={isSaveDisabled}
    >
      <div className="space-y-4">
        <p>
          <strong>Name:</strong> {lead.name}
        </p>
        <p>
          <strong>Company:</strong> {lead.company}
        </p>

        <div>
          <strong>Email:</strong>
          <input
            type="text"
            value={editingLead?.email ?? ""}
            onChange={(e) => handleEmailChange(e.target.value)}
            className={`border rounded px-2 py-1 w-full mt-1 ${
              error ? "border-red-500" : ""
            }`}
          />
          {error && <p className="text-red-500 mt-1">{error}</p>}
        </div>

        <Select
          type="form"
          label="Status"
          options={leadStatusOptions}
          value={editingLead?.status ?? ""}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setEditingLead((prev) =>
              prev ? { ...prev, status: e.target.value } : prev
            )
          }
        />
      </div>
    </SlideOver>
  );
}
