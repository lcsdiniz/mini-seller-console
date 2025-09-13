export type SelectOption = {
  label: string;
  value: string;
};

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

export const LeadSort = {
  Score: "score",
  Name: "name",
  Company: "company",
} as const;

export type LeadSort = typeof LeadSort[keyof typeof LeadSort];

export const leadSortOptions: SelectOption[] = [
  { label: "Score (desc)", value: LeadSort.Score },
  { label: "Name (A-Z)", value: LeadSort.Name },
  { label: "Company (A-Z)", value: LeadSort.Company },
];