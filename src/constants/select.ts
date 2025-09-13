export type SelectOption = {
  label: string;
  value: string;
};

export const Sort = {
  Score: "score",
  Name: "name",
  Company: "company",
} as const;

export type Sort = typeof Sort[keyof typeof Sort];

export const sortOptions: SelectOption[] = [
  { label: "Score (desc)", value: Sort.Score },
  { label: "Name (A-Z)", value: Sort.Name },
  { label: "Company (A-Z)", value: Sort.Company },
];