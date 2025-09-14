import { useEffect, useState } from "react";
import type { Lead } from "@/types";
import { Button } from "@/components/ui/Button";
import { EditableEmail } from "./EditableEmail";
import { leadStatusOptions } from "../constants";

interface LeadRowProps {
  readonly lead: Lead;
  readonly onSelect: (lead: Lead) => void;
  readonly onConvert: (lead: Lead) => void;
  readonly onUpdate: (updatedLead: Lead) => void;
}

export function LeadRow({ lead, onSelect, onConvert, onUpdate }: LeadRowProps) {
  const [editingStatus, setEditingStatus] = useState(lead.status);

  function handleStatusChange(value: string) {
    setEditingStatus(value);
    if (value !== lead.status) {
      onUpdate({ ...lead, status: value });
    }
  };

  useEffect(() => {
    setEditingStatus(lead.status);
  }, [lead.status]);

  return (
    <tr
      className="border-b border-gray-200 bg-white hover:bg-gray-100 cursor-pointer"
      onClick={() => onSelect(lead)}
    >
      <td className="px-4 py-2">{lead.name}</td>
      <td className="px-4 py-2 hidden md:table-cell">{lead.company}</td>
      <td className="px-4 py-2 hidden lg:table-cell">
        <td className="px-4 py-2 hidden lg:table-cell">
          <EditableEmail
            value={lead.email}
            onSave={(newEmail) => onUpdate({ ...lead, email: newEmail })}
          />
        </td>
      </td>
      <td className="px-4 py-2">{lead.score}</td>
      <td className="px-4 py-2 capitalize">
        <select
          value={editingStatus}
          onChange={(e) => handleStatusChange(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          className="border rounded px-2 py-1"
        >
          {leadStatusOptions
            .filter(status => status.value !== "all")
            .map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))
          }
        </select>
      </td>
      <td className="px-4 py-2">
        <Button
          label="Convert"
          paddingX={2}
          paddingY={1}
          onClick={(e) => {
            e.stopPropagation();
            onConvert(lead);
          }}
        />
      </td>
    </tr>
  );
}
