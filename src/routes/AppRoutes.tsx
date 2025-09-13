import { Route, Routes } from "react-router-dom";
import LeadList from "../components/Lead/LeadList";
import OpportunityList from "../components/Opportinity/OpportunityList";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LeadList />} />
      <Route path="/leads" element={<LeadList />} />
      <Route path="/opportunities" element={<OpportunityList />} />
    </Routes>
  )
}