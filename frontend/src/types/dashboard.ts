// Dashboard Types - Matching Backend Models Exactly

// ============ SETTINGS ============
export interface ImageData {
  url: string;
  public_id: string;
}

export interface AdminInfo {
  name: string;
  username: string;
  image: ImageData;
  github: string;
  linkedin: string;
  facebook: string;
  email: string;
  phone: string;
  whatsapp: string;
}

export interface HeroSection {
  title: string;
  description: string;
}

export interface AboutSection {
  title: string;
  description: string;
  image: ImageData;
}

export interface ContactPitch {
  title: string;
  description: string;
  email: string;
  phone: string;
  location: string;
}

export interface FooterSettings {
  year: string;
  facebook: string;
  github: string;
  linkedin: string;
  email: string;
  phone: string;
  whatsapp: string;
}

export interface Settings {
  adminInfo: AdminInfo;
  heroSection: HeroSection;
  aboutSection: AboutSection;
  contactPitch: ContactPitch;
  footer: FooterSettings;
}

// ============ SKILLSET ============
export interface Skillset {
  frontend: string[];
  backend: string[];
  tools: string[];
}

// ============ STATS ============
export interface Stats {
  yearsOfExperience: string;
  projectsCompleted: string;
  happyClients: string;
  coffeeConsumed: string;
}

// ============ PROJECTS ============
export interface Project {
  _id?: string;
  title: string;
  description: string;
  techs: string[];
  github: string;
  liveLink: string;
  image: ImageData;
  order: number;
}

// ============ PROJECT SLOT REQUESTS ============
export interface ProjectSlotRequest {
  _id: string;
  email: string;
  projectDetails: string;
  createdAt: string;
}

// ============ CONTACT MESSAGES ============
export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

// ============ API PAYLOADS ============
export interface UpdateSettingsPayload {
  settings: Settings;
}

export interface UpdateSkillsetPayload {
  skillset: Skillset;
}

export interface UpdateStatsPayload {
  stats: Stats;
}

export interface CreateProjectPayload {
  project: Omit<Project, '_id'>;
}

export interface UpdateProjectPayload {
  project: Project;
}
