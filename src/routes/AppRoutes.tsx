import { Route, Routes } from "react-router-dom";
import LeadList from "@/features/lead/components/LeadList";
import OpportunityList from "@/features/opportunity/components/OpportunityList";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LeadList />} />
      <Route path="/opportunities" element={<OpportunityList />} />
    </Routes>
  )
}