import type { SelectOption } from "../../../types";

export const OpportunitySort = {
  Name: "name",
} as const;

export type OpportunitySort = typeof OpportunitySort[keyof typeof OpportunitySort];

export const opportunituSortOptions: SelectOption[] = [
  { label: "Name (A-Z)", value: OpportunitySort.Name },
];