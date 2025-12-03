// Subdomain utilities for routing between main site and portal
// This handles both development (localhost) and production subdomains

/**
 * Get the current subdomain from the hostname
 * @returns The subdomain (e.g., "portal") or null if on main domain
 */
export function getSubdomain(): string | null {
  if (typeof window === "undefined") return null; // SSR safety
  
  const hostname = window.location.hostname;
  
  // Development: portal.localhost or portal.localhost:5173
  if (hostname.includes("localhost")) {
    const parts = hostname.split(".");
    if (parts.length > 1 && parts[0] !== "www") {
      return parts[0];
    }
    return null;
  }
  
  // Production: portal.afcfta-2026.com
  const parts = hostname.split(".");
  if (parts.length > 2) {
    const subdomain = parts[0];
    if (subdomain !== "www") {
      return subdomain;
    }
  }
  
  return null;
}

/**
 * Check if current page is on the portal subdomain
 */
export function isPortalSubdomain(): boolean {
  return getSubdomain() === "portal";
}

/**
 * Check if current page is on the main domain
 */
export function isMainDomain(): boolean {
  return getSubdomain() === null;
}

/**
 * Get the base URL for the portal subdomain
 */
export function getPortalUrl(path: string = "/"): string {
  if (typeof window === "undefined") return path;
  
  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  const port = window.location.port;
  
  // Development
  if (hostname.includes("localhost")) {
    const portStr = port ? `:${port}` : "";
    return `${protocol}//portal.localhost${portStr}${path}`;
  }
  
  // Production
  const baseDomain = hostname.replace(/^(www\.|portal\.)/, "");
  return `${protocol}//portal.${baseDomain}${path}`;
}

/**
 * Get the base URL for the main domain
 */
export function getMainUrl(path: string = "/"): string {
  if (typeof window === "undefined") return path;
  
  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  const port = window.location.port;
  
  // Development
  if (hostname.includes("localhost")) {
    const portStr = port ? `:${port}` : "";
    return `${protocol}//localhost${portStr}${path}`;
  }
  
  // Production
  const baseDomain = hostname.replace(/^(www\.|portal\.)/, "");
  return `${protocol}//www.${baseDomain}${path}`;
}

/**
 * Navigate to a URL on a specific domain
 * @param path - The path to navigate to
 * @param domain - "main" or "portal"
 */
export function navigateToDomain(path: string, domain: "main" | "portal"): void {
  const url = domain === "portal" ? getPortalUrl(path) : getMainUrl(path);
  window.location.href = url;
}

/**
 * Get environment-specific configuration
 */
export function getSubdomainConfig() {
  const isDev = import.meta.env.DEV;
  const hostname = typeof window !== "undefined" ? window.location.hostname : "";
  
  return {
    isDevelopment: isDev,
    isProduction: !isDev,
    currentSubdomain: getSubdomain(),
    isPortal: isPortalSubdomain(),
    isMain: isMainDomain(),
    hostname,
  };
}
