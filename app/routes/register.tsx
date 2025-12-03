import type { Route } from "./+types/register";
import RegisterPage from "~/components/portal/RegisterPage";

export const meta: Route.MetaFunction = () => [
  { title: "Register — AfCFTA Hackathon 2026" },
  {
    name: "description",
    content: "Register your business for the AfCFTA marketplace.",
  },
];

export default function PortalRegister() {
  return <RegisterPage />;
}
