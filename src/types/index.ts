export interface Lead {
  id: number;
  name: string;
  company: string;
  email: string;
  source: string;
  score: number;
  status: string;
}

export interface Opportunity {
  id: number;
  name: string;
  stage: string;
  amount?: number;
  accountName: string;
}
