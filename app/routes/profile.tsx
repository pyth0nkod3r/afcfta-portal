import type { Route } from "./+types/profile";
import ProfilePage from "~/components/portal/ProfilePage";

export const meta: Route.MetaFunction = () => [
  { title: "Profile — AfCFTA Hackathon 2026" },
  {
    name: "description",
    content: "Manage your business profile and account settings.",
  },
];

export default function PortalProfile() {
  return <ProfilePage />;
}
