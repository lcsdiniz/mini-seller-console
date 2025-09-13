import type { Opportunity } from "../types";

export async function createOpportunity(opportunity: Opportunity) {
  try {
    await new Promise((res) => setTimeout(res, 500));
    
    if (Math.random() < 0.1) {
      throw new Error("Failed to create opportunity.");
    }

    const opportunities: Opportunity[] = localStorage.getItem('@mini-seller-console:opportunities')
      ? JSON.parse(localStorage.getItem('@mini-seller-console:opportunities')!)
      : [];

    opportunities.push(opportunity);
    localStorage.setItem('@mini-seller-console:opportunities', JSON.stringify(opportunities));
  } catch (err) {
    throw new Error(
      `Failed to update opportunity. ${err instanceof Error ? err.message : ""} Please try again later.`
    );
  }
}

export async function getOpportunities(): Promise<Opportunity[]> {
  try {
    await new Promise((res) => setTimeout(res, 500));
    
    if (localStorage.getItem('@mini-seller-console:opportunities') === null) {
      const opportunities: Opportunity[] = [];
      localStorage.setItem('@mini-seller-console:opportunities', JSON.stringify(opportunities));

      return opportunities;
    } else {
      return JSON.parse(localStorage.getItem('@mini-seller-console:opportunities')!);
    }
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "Failed to fetch opportunities.");
  }

}