// Centralized API client for portal operations
// All backend calls should go through this file for easy replacement with real API

import type { User } from "~/types/portal";

// Mock user database (stored in localStorage)
const USERS_KEY = "portal_users";
const AUTH_TOKEN_KEY = "portal_auth_token";

// Internal type with password for storage (never expose this to UI)
interface UserWithPassword extends User {
  password: string;
}

// Types
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegistrationData {
  companyName: string;
  registrationNumber: string;
  country: string;
  industry: string;
  address: string;
  contactName: string;
  email: string;
  phone: string;
  tin: string;
  vat?: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface DashboardStats {
  totalProjects: number;
  completedTasks: number;
  activeHours: number;
  teamMembers: number;
}

export interface Activity {
  id: string;
  type: string;
  title: string;
  description?: string;
  timestamp: string;
}

export interface QuickStats {
  todayTasks: number;
  pendingReviews: number;
  upcomingMeetings: number;
  unreadMessages: number;
}

export interface ChartDataPoint {
  name: string;
  projects: number;
  tasks: number;
}

// Helper functions
function getUsers(): Record<string, UserWithPassword> {
  const usersJson = localStorage.getItem(USERS_KEY);
  if (usersJson) {
    return JSON.parse(usersJson);
  }

  // Seed default user
  const defaultUser: UserWithPassword = {
    id: "default-admin",
    name: "System Admin",
    email: "admin@afcfta.app",
    avatar:
      "https://ui-avatars.com/api/?name=System+Admin&background=0D8ABC&color=fff",
    companyName: "AfCFTA Portal",
    registrationNumber: "SYS-001",
    country: "Ghana",
    industry: "Technology",
    address: "Africa Trade House, Accra",
    phone: "+233 55 555 5555",
    tin: "GHA-000000000",
    password: "password123",
    createdAt: new Date().toISOString(),
  };

  const users = { [defaultUser.id]: defaultUser };
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return users;
}

function saveUsers(users: Record<string, UserWithPassword>): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function generateToken(email: string): string {
  return btoa(`${email}:${Date.now()}`);
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// API Client
export const portalApi = {
  // Authentication
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const users = getUsers();
    const user = Object.values(users).find(
      (u) => u.email === credentials.email
    );

    if (!user) {
      throw new Error(
        "User not found. Please check your email or register first."
      );
    }

    // In a real implementation, verify password hash
    if (user.password !== credentials.password) {
      throw new Error("Invalid password. Please try again.");
    }

    const token = generateToken(credentials.email);
    localStorage.setItem(AUTH_TOKEN_KEY, token);

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword as User,
      token,
    };
  },

  async register(data: RegistrationData): Promise<void> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const users = getUsers();

    // Check if user already exists
    if (Object.values(users).some((u) => u.email === data.email)) {
      throw new Error(
        "An account with this email already exists. Please login instead."
      );
    }

    // Create new user
    const userId = generateId();
    const user: UserWithPassword = {
      id: userId,
      name: data.contactName,
      email: data.email,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.contactName)}&background=random`,
      companyName: data.companyName,
      registrationNumber: data.registrationNumber,
      country: data.country,
      industry: data.industry,
      address: data.address,
      phone: data.phone,
      tin: data.tin,
      vat: data.vat,
      password: data.password, // In real app, this would be hashed
      createdAt: new Date().toISOString(),
    };

    users[userId] = user;
    saveUsers(users);
  },

  async getCurrentUser(): Promise<User | null> {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) return null;

    // Decode token to get email
    try {
      const decoded = atob(token);
      const email = decoded.split(":")[0];

      const users = getUsers();
      const user = Object.values(users).find((u) => u.email === email);

      if (!user) {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        return null;
      }

      // Return user without password
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword as User;
    } catch {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      return null;
    }
  },

  async logout(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    localStorage.removeItem(AUTH_TOKEN_KEY);
  },

  // Dashboard data
  async getDashboardStats(): Promise<DashboardStats> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      totalProjects: 12,
      completedTasks: 87,
      activeHours: 156,
      teamMembers: 8,
    };
  },

  async getActivities(limit = 5): Promise<Activity[]> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return [
      {
        id: "1",
        type: "project_created",
        title: "New project created",
        description: "AfCFTA Trade Documentation",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "2",
        type: "task_completed",
        title: "Task completed",
        description: "Certificate of Origin submitted",
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "3",
        type: "comment_added",
        title: "New comment",
        description: "Review needed on customs documentation",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "4",
        type: "file_uploaded",
        title: "File uploaded",
        description: "Business registration certificate",
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "5",
        type: "team_joined",
        title: "New team member",
        description: "Sarah Johnson joined your workspace",
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ].slice(0, limit);
  },

  async getQuickStats(): Promise<QuickStats> {
    await new Promise((resolve) => setTimeout(resolve, 350));
    return {
      todayTasks: 5,
      pendingReviews: 3,
      upcomingMeetings: 2,
      unreadMessages: 8,
    };
  },

  async getChartData(period: "weekly" | "monthly"): Promise<ChartDataPoint[]> {
    await new Promise((resolve) => setTimeout(resolve, 450));

    if (period === "weekly") {
      return [
        { name: "Mon", projects: 4, tasks: 24 },
        { name: "Tue", projects: 3, tasks: 18 },
        { name: "Wed", projects: 5, tasks: 32 },
        { name: "Thu", projects: 4, tasks: 28 },
        { name: "Fri", projects: 6, tasks: 35 },
        { name: "Sat", projects: 2, tasks: 12 },
        { name: "Sun", projects: 1, tasks: 8 },
      ];
    } else {
      return [
        { name: "Week 1", projects: 15, tasks: 95 },
        { name: "Week 2", projects: 18, tasks: 112 },
        { name: "Week 3", projects: 12, tasks: 78 },
        { name: "Week 4", projects: 20, tasks: 125 },
      ];
    }
  },

  async updateProfile(userId: string, data: Partial<User>): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const users = getUsers();
    const user = users[userId];

    if (!user) {
      throw new Error("User not found");
    }

    // Update user data (preserve password)
    const updatedUser: UserWithPassword = { ...user, ...data };
    users[userId] = updatedUser;
    saveUsers(users);

    // Return user without password
    const { password: _, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword as User;
  },
};
