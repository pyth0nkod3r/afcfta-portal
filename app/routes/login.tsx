import type { Route } from "./+types/login";
import LoginPage from "~/components/portal/LoginPage";

export const meta: Route.MetaFunction = () => [
  { title: "Portal Login — AfCFTA Hackathon 2026" },
  {
    name: "description",
    content: "Sign in to your AfCFTA portal to access your dashboard, profile, and settings.",
  },
];

export default function PortalLogin() {
  return <LoginPage />;
}
