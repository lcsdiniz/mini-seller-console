export type Lead = {
  id: number;
  name: string;
  company: string;
  email: string;
  source: string;
  score: number;
  status: string;
}

export type Opportunity = {
  id: number;
  name: string;
  stage: string;
  amount?: number;
  accountName: string;
}

export type TableHeader = {
  key: string;
  label: string;
}

export type SelectOption = {
  label: string;
  value: string;
};