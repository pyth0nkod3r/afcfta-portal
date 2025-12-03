import type { Route } from "./+types/dashboard";
import DashboardPage from "~/components/portal/DashboardPage";

export const meta: Route.MetaFunction = () => [
  { title: "Dashboard — AfCFTA Hackathon 2026" },
  {
    name: "description",
    content: "View your business dashboard and track your progress.",
  },
];

export default function PortalDashboard() {
  return <DashboardPage />;
}
