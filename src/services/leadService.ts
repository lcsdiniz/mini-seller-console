import type { Lead } from "../types";
import leadsData from "../assets/leads.json";

export async function getLeads(): Promise<Lead[]> {
  // simula latência
  await new Promise((res) => setTimeout(res, 500));
  
  return leadsData;
}

