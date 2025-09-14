import type { Lead } from '@/types';
import { Button } from '@/components/ui/Button';

interface LeadRowProps {
  readonly lead: Lead;
  readonly onSelect: (lead: Lead) => void;
  readonly onConvert: (lead: Lead) => void;
}

export function LeadRow({ lead, onSelect, onConvert }: LeadRowProps) {
  return (
    <tr
      key={lead.id}
      className="border-b border-gray-200 bg-white hover:bg-gray-100 cursor-pointer"
      onClick={() => onSelect(lead)}
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
            onConvert(lead);
          }}
        />
      </td>
    </tr>
  );
}
