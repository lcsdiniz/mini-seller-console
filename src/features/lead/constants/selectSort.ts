import type { SelectOption } from "../../../types";

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