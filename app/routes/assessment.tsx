import type { Route } from "./+types/assessment";
import AssessmentPage from "~/components/portal/AssessmentPage";

export const meta: Route.MetaFunction = () => [
  { title: "Readiness Assessment — AfCFTA Hackathon 2026" },
  {
    name: "description",
    content: "Assess your business readiness for the AfCFTA marketplace.",
  },
];

export default function PortalAssessment() {
  return <AssessmentPage />;
}
