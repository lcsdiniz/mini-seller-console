import type { SelectOption } from "../../types";

export const LeadStatus = {
  New: "new",
  Contacted: "contacted",
  Qualified: "qualified",
  Lost: "lost",
};

export type LeadStatus = typeof LeadStatus[keyof typeof LeadStatus];

export const leadStatusOptions: SelectOption[] = [
  { label: "All Status", value: "all" },
  { label: "New", value: LeadStatus.New },
  { label: "Contacted", value: LeadStatus.Contacted },
  { label: "Qualified", value: LeadStatus.Qualified },
];