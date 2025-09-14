import type { Lead } from "@/types";
import { leadStatusOptions } from "../constants";
import { EditableEmail } from "./EditableEmail";

interface LeadCardProps {
  readonly lead: Lead;
  readonly onSelect: (lead: Lead) => void;
  readonly onConvert: (lead: Lead) => void;
  readonly onUpdate: (lead: Lead) => void;
}

export function LeadCard({ lead, onSelect, onConvert, onUpdate }: LeadCardProps) {
  return (
    <div
      className="bg-white border rounded-lg p-4 mb-4 shadow"
    >
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg">
          {lead.name} <span className="text-sm text-gray-500">{lead.company}</span>
        </h3>

        <h4 className="text-sm text-gray-500 font-bold">Score: {lead.score}</h4>
      </div>
      
      {/* Email editável */}
      <div className="mt-2">
        <EditableEmail
          value={lead.email}
          onSave={(newEmail) => onUpdate({ ...lead, email: newEmail })}
        />
      </div>


      {/* Status select */}
      <select
        value={lead.status}
        onChange={(e) => {
          e.stopPropagation();
          onUpdate({ ...lead, status: e.target.value })
        }}
        className="border rounded px-2 py-1 mt-2 w-full"
      >
        {leadStatusOptions
          .filter((s) => s.value !== "all")
          .map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>

      {/* Botões */}
      <div className="flex gap-4 mt-2">
        <button
          onClick={() => onSelect(lead)}
          className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
        >
          Details
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onConvert(lead);
          }}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          Convert
        </button>
      </div>
    </div>
  );
}
