import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),
  route("/assessment", "routes/assessment.tsx"),
  route("/results", "routes/results.tsx"),
  route("/register", "routes/register.tsx"),
  route("/login", "routes/login.tsx"),
  route("/dashboard", "routes/dashboard.tsx"),
  route("/profile", "routes/profile.tsx"),
  route("/settings", "routes/settings.tsx"),
] satisfies RouteConfig;
