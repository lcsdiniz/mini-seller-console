import type { SelectOption } from "../../../types";

export const OpportunityStage = {
  All: "all",
  Prospecting: "Prospecting",
  Negotiation: "Negotiation",
  ClosedWon: "Closed Won",
  ClosedLost: "Closed Lost",
} as const;

export type OpportunityStage = typeof OpportunityStage[keyof typeof OpportunityStage];

export const opportunityStageOptions: SelectOption[] = [
  { label: "All Stages", value: OpportunityStage.All },
  { label: "Prospecting", value: OpportunityStage.Prospecting },
  { label: "Negotiation", value: OpportunityStage.Negotiation },
  { label: "Closed Won", value: OpportunityStage.ClosedWon },
  { label: "Closed Lost", value: OpportunityStage.ClosedLost },
];