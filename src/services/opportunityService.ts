import { STORAGE_KEYS } from "../constants";
import type { Opportunity } from "../types";

export async function createOpportunity(opportunity: Opportunity) {
  try {
    await new Promise((res) => setTimeout(res, 500));
    
    if (Math.random() < 0.1) {
      throw new Error("Failed to create opportunity.");
    }

    const opportunities: Opportunity[] = localStorage.getItem(STORAGE_KEYS.opportunitiesList)
      ? JSON.parse(localStorage.getItem(STORAGE_KEYS.opportunitiesList)!)
      : [];

    opportunities.push(opportunity);
    localStorage.setItem(STORAGE_KEYS.opportunitiesList, JSON.stringify(opportunities));
  } catch (err) {
    throw new Error(
      `Failed to update opportunity. ${err instanceof Error ? err.message : ""} Please try again later.`
    );
  }
}

export async function getOpportunities(): Promise<Opportunity[]> {
  try {
    await new Promise((res) => setTimeout(res, 500));
    
    if (localStorage.getItem(STORAGE_KEYS.opportunitiesList) === null) {
      const opportunities: Opportunity[] = [];
      localStorage.setItem(STORAGE_KEYS.opportunitiesList, JSON.stringify(opportunities));

      return opportunities;
    } else {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.opportunitiesList)!);
    }
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "Failed to fetch opportunities.");
  }

}