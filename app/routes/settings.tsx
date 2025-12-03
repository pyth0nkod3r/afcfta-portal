import type { Route } from "./+types/settings";
import SettingsPage from "~/components/portal/SettingsPage";

export const meta: Route.MetaFunction = () => [
  { title: "Settings — AfCFTA Hackathon 2026" },
  {
    name: "description",
    content: "Manage your account settings and preferences.",
  },
];

export default function PortalSettings() {
  return <SettingsPage />;
}
