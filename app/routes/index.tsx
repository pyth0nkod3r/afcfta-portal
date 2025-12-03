import type { Route } from "./+types/index";
import LandingPage from "~/components/portal/LandingPage";

export const meta: Route.MetaFunction = () => [
  { title: "AfCFTA Hackathon 2026 — Portal" },
  {
    name: "description",
    content: "Join the AfCFTA Hackathon 2026 and transform African trade.",
  },
];

export default function PortalIndex() {
  return <LandingPage />;
}
