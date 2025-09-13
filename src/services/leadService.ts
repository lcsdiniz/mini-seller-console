import type { Lead } from "../types";
import leadsData from "../assets/leads.json";

export async function getLeads(): Promise<Lead[]> {
  try {
    await new Promise((res) => setTimeout(res, 500));

    const stored = localStorage.getItem('@mini-seller-console:leads');

    if (!stored) {
      localStorage.setItem('@mini-seller-console:leads', JSON.stringify(leadsData));
      return leadsData;
    }

    return JSON.parse(stored);
  } catch (err) {
    throw new Error(
      `Failed to fetch leads. ${err instanceof Error ? err.message : ""} Please try again later.`
    );
  }
}

export async function updateLead(updated: Lead) {
  try {
    await new Promise((res) => setTimeout(res, 500));

    if (Math.random() < 0.1) {
      throw new Error("Random failure while updating lead.");
    }

    const stored = localStorage.getItem('@mini-seller-console:leads');
    if (!stored) {
      throw new Error("No leads found in storage.");
    }

    const leads: Lead[] = JSON.parse(stored);
    const index = leads.findIndex((lead) => lead.id === updated.id);

    if (index === -1) {
      throw new Error("Lead not found.");
    }

    leads[index] = { ...leads[index], ...updated };
    localStorage.setItem('@mini-seller-console:leads', JSON.stringify(leads));

    return leads[index];
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "Failed to update lead.");
  }
}
