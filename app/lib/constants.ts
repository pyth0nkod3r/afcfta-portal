/**
 * Shared constants and data structures used across components
 */

// Common navigation and link structures
export const COMMON_LINKS = {
  register: "/register",
  challengeTracks: "/challenge-tracks",
  rewards: "/rewards-incentives",
  timeline: "/timeline-format",
  venue: "/venue-dates",
  partners: "/partners",
  faq: "/faq",
  whyAfcfta: "/why-afcfta",
  terms: "/terms",
  privacy: "/privacy",
} as const;

// Common CTA button configurations
export const COMMON_CTAS = {
  register: {
    label: "Register Now",
    href: COMMON_LINKS.register,
    variant: "primary" as const,
  },
  registerTeam: {
    label: "Register Your Team",
    href: COMMON_LINKS.register,
    variant: "primary" as const,
  },
  viewTracks: {
    label: "View Challenge Tracks",
    href: COMMON_LINKS.challengeTracks,
    variant: "outline" as const,
  },
  viewRewards: {
    label: "View Rewards",
    href: COMMON_LINKS.rewards,
    variant: "outline" as const,
  },
  downloadGuide: {
    label: "Download Guide",
    href: "/assets/guide.pdf",
    variant: "outline" as const,
  },
} as const;

// Common event dates and milestones
export const EVENT_DATES = {
  registrationOpen: "January 15, 2026",
  registrationClose: "October 15, 2026",
  hackathonStart: "November 10, 2026",
  hackathonEnd: "November 12, 2026",
  winnersAnnouncement: "November 15, 2026",
} as const;

// Common prize pool information
export const PRIZE_INFO = {
  totalPrizePool: "$500K+",
  nonCashBenefits: "$2M+",
  awardCategories: "15+",
  grandPrize: "$100,000",
  runnerUp: "$50,000",
  thirdPlace: "$25,000",
} as const;

// Common contact information
export const CONTACT_INFO = {
  supportEmail: "support@afcfta-hackathon.org",
  partnersEmail: "partners@afcfta-hackathon.org",
  mediaEmail: "media@afcfta-hackathon.org",
  generalEmail: "info@afcfta-hackathon.org",
} as const;

// Common social media links
export const SOCIAL_LINKS = {
  twitter: "https://twitter.com/afcfta_hackathon",
  linkedin: "https://linkedin.com/company/afcfta-hackathon",
  instagram: "https://instagram.com/afcfta_hackathon",
  youtube: "https://youtube.com/@afcfta-hackathon",
} as const;

// Common asset paths
export const ASSETS = {
  heroImage: "/images/hero-placeholder.png",
  logo: "/images/afcfta-logo.jpg",
  trackGuide: "/assets/track-guide.pdf",
  rewardsGuide: "/assets/rewards-guide.pdf",
  participantGuide: "/assets/participant-guide.pdf",
} as const;
