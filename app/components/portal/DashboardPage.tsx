import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import {
  FolderKanban,
  CheckCircle2,
  Clock,
  Users,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  FileText,
  Calendar,
  Bell,
  ChevronRight,
  LogOut,
  User as UserIcon,
  Settings as SettingsIcon,
  LayoutDashboard,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Progress } from "~/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import Header from "~/components/portal/Header";
import { ProtectedPortalRoute } from "~/components/portal/ProtectedPortalRoute";
import { usePortalAuth } from "~/contexts/PortalAuthContext";
import { portalApi } from "~/lib/portal-api";
import { useToast } from "~/hooks/use-toast";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendValue,
}: {
  title: string;
  value: string | number;
  description: string;
  icon: React.ElementType;
  trend?: "up" | "down";
  trendValue?: string;
}) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between gap-4 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold">{value}</span>
          {trend && trendValue && (
            <span
              className={`flex items-center text-xs font-medium ${
                trend === "up" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              }`}
            >
              {trend === "up" ? (
                <TrendingUp className="mr-1 h-3 w-3" />
              ) : (
                <TrendingDown className="mr-1 h-3 w-3" />
              )}
              {trendValue}
            </span>
          )}
        </div>
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function QuickActionCard({
  title,
  description,
  icon: Icon,
  count,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  count?: number;
}) {
  return (
    <button className="flex w-full items-center gap-4 rounded-lg border border-border bg-card p-4 text-left hover:shadow-md transition-all duration-200">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">{title}</span>
          {count !== undefined && count > 0 && (
            <Badge variant="secondary" className="text-xs">{count}</Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground truncate">{description}</p>
      </div>
      <ChevronRight className="h-5 w-5 text-muted-foreground" />
    </button>
  );
}

function DashboardContent() {
  const { user, logout } = usePortalAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [stats, setStats] = useState({ totalProjects: 12, completedTasks: 87, activeHours: 156, teamMembers: 8 });
  const [quickStats, setQuickStats] = useState({ todayTasks: 5, pendingReviews: 3, upcomingMeetings: 2, unreadMessages: 8 });

  const handleLogout = async () => {
    await logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/login");
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                  <LayoutDashboard className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-semibold">AfCFTA Portal</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile">
                      <UserIcon className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings">
                      <SettingsIcon className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.name}! Here's an overview of your activity.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Projects"
              value={stats.totalProjects}
              description="Active projects this month"
              icon={FolderKanban}
              trend="up"
              trendValue="+12%"
            />
            <StatCard
              title="Completed Tasks"
              value={stats.completedTasks}
              description="Tasks finished this week"
              icon={CheckCircle2}
              trend="up"
              trendValue="+8%"
            />
            <StatCard
              title="Active Hours"
              value={stats.activeHours}
              description="Hours logged this month"
              icon={Clock}
              trend="down"
              trendValue="-3%"
            />
            <StatCard
              title="Team Members"
              value={stats.teamMembers}
              description="People in your workspace"
              icon={Users}
              trend="up"
              trendValue="+2"
            />
          </div>

          {/* Quick Actions and Project Progress */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">Quick Actions</CardTitle>
                <CardDescription>Your pending items at a glance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <QuickActionCard
                  title="Today's Tasks"
                  description="Tasks due today"
                  icon={CheckCircle2}
                  count={quickStats.todayTasks}
                />
                <QuickActionCard
                  title="Pending Reviews"
                  description="Awaiting your approval"
                  icon={FileText}
                  count={quickStats.pendingReviews}
                />
                <QuickActionCard
                  title="Meetings"
                  description="Upcoming today"
                  icon={Calendar}
                  count={quickStats.upcomingMeetings}
                />
                <QuickActionCard
                  title="Messages"
                  description="Unread messages"
                  icon={Bell}
                  count={quickStats.unreadMessages}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">Project Progress</CardTitle>
                <CardDescription>Status of your current projects</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">AfCFTA Documentation</span>
                    <span className="text-muted-foreground">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Certificate Preparation</span>
                    <span className="text-muted-foreground">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Customs Registration</span>
                    <span className="text-muted-foreground">90%</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Market Research</span>
                    <span className="text-muted-foreground">30%</span>
                  </div>
                  <Progress value={30} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Company Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">Company Information</CardTitle>
              <CardDescription>Your registered business details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Company Name</p>
                  <p className="mt-1 font-medium">{user?.companyName || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Registration Number</p>
                  <p className="mt-1 font-medium">{user?.registrationNumber || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Country</p>
                  <p className="mt-1 font-medium">{user?.country || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Industry</p>
                  <p className="mt-1 font-medium">{user?.industry || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">TIN</p>
                  <p className="mt-1 font-medium">{user?.tin || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Contact Email</p>
                  <p className="mt-1 font-medium">{user?.email || "N/A"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedPortalRoute>
      <DashboardContent />
    </ProtectedPortalRoute>
  );
}
