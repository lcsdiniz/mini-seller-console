import type { Lead } from "../types";
import leadsData from "../assets/leads.json";

export async function getLeads(): Promise<Lead[]> {
  await new Promise((res) => setTimeout(res, 500));
  
  if (localStorage.getItem('@mini-seller-console:leads') === null) {
    localStorage.setItem('@mini-seller-console:leads', JSON.stringify(leadsData));

    return leadsData;
  } else {
    return JSON.parse(localStorage.getItem('@mini-seller-console:leads')!);
  }
}

export async function updateLead(updated: Lead) {
  await new Promise((res) => setTimeout(res, 500));

  if (Math.random() < 0.1) {
    throw new Error("Failed to update lead.");
  }

  const leads: Lead[] = localStorage.getItem('@mini-seller-console:leads')
    ? JSON.parse(localStorage.getItem('@mini-seller-console:leads')!)
    : [];

  const index = leads.findIndex((lead) => lead.id === updated.id);

  if (index !== -1) {
    leads[index] = { ...leads[index], ...updated };
    console.log(leads);
    localStorage.setItem('@mini-seller-console:leads', JSON.stringify(leads));
  }
}