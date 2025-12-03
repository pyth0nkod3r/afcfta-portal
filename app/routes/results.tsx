import type { Route } from "./+types/results";
import ResultsPage from "~/components/portal/ResultsPage";

export const meta: Route.MetaFunction = () => [
  { title: "Assessment Results — AfCFTA Hackathon 2026" },
  {
    name: "description",
    content: "View your AfCFTA readiness assessment results and next steps.",
  },
];

export default function PortalResults() {
  return <ResultsPage />;
}
