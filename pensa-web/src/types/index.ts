// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

// Disease Types
export interface Disease {
  id: number;
  name: string;
  description: string;
  symptoms: string;
  treatment: string;
  prevention: string;
  imageUrl?: string;
  isFeatured: boolean;
  category: DiseaseCategory;
  createdAt: string;
}

export type DiseaseCategory =
  | "INFECTIOUS_DISEASES"
  | "CHRONIC_DISEASES"
  | "GENETIC_DISEASES"
  | "AUTOIMMUNE_DISEASES"
  | "MENTAL_HEALTH"
  | "CARDIOVASCULAR"
  | "RESPIRATORY"
  | "GASTROINTESTINAL"
  | "MATERNAL_HEALTH"
  | "CHILD_HEALTH"
  | "OTHER";

// Doctor Types
export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  email: string;
  phone: string;
  address: string;
  biography: string;
  imageUrl?: string;
}

// Service Types
export interface Service {
  id: number;
  name: string;
  description: string;
  imageUrl?: string;
  type: ServiceType;
}

export type ServiceType =
  | "CONSULTATION"
  | "TREATMENT"
  | "PREVENTION"
  | "RESEARCH"
  | "EDUCATION"
  | "OTHER";

// Project Types
export interface Project {
  id: number;
  title: string;
  description: string;
  clientName: string;
  startDate: string;
  endDate?: string;
  status: ProjectStatus;
  imageUrl?: string;
  isFeatured: boolean;
}

export type ProjectStatus =
  | "PLANNING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "ON_HOLD"
  | "CANCELLED";

// FAQ Types
export interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: FAQCategory;
  displayOrder: number;
}

export type FAQCategory =
  | "GENERAL"
  | "DISEASES"
  | "SERVICES"
  | "DOCTORS"
  | "APPOINTMENTS"
  | "OTHER";

// Newsletter Types
export interface NewsletterSubscription {
  email: string;
  name?: string;
}

// Contact Types
export interface ContactMessage {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

// Auth Types
export interface User {
  id: number;
  username: string;
  email: string;
  role: UserRole;
  createdAt: string;
  isActive: boolean;
}

export type UserRole = "USER" | "ADMIN";

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  type: string;
  id: number;
  username: string;
  email: string;
  role: string;
}

