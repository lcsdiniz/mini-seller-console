import type { Lead } from "@/types";
import SlideOver from "@/components/layout/SlideOver";

type LeadDetailsProps = {
  readonly lead: Lead;
  readonly isOpen: boolean;
  readonly onClose: () => void;
};

export function LeadDetails({
  lead,
  isOpen,
  onClose,
}: LeadDetailsProps) {

  return (
    <SlideOver
      isOpen={isOpen}
      onClose={onClose}
      title="Lead Details"
    >
      <div className="space-y-4">
        <p>
          <strong>Name:</strong> {lead.name}
        </p>
        <p>
          <strong>Company:</strong> {lead.company}
        </p>

        <p>
          <strong>Email:</strong> {lead.email}
        </p>
        <p>
          <strong>Status:</strong> <span className="capitalize">{lead.status}</span>
        </p>
      </div>
    </SlideOver>
  );
}
