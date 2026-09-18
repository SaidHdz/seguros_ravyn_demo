/**
 * Domain types and data contracts for Ravyn Seguros.
 * 
 * Centralizing data structures ensures strict type checking across
 * the Astro presentation layer, React interactive islands, and external webhook services.
 */

/**
 * Valid insurance policy categories available for quotation.
 * Constrained union type to prevent arbitrary string values reaching backend services.
 */
export type InsuranceType = 'auto' | 'life' | 'health' | 'home';

/**
 * Payload sent by the prospective client via the lead capture form.
 */
export interface LeadFormData {
  fullName: string;
  email: string;
  zipCode: string;
  insuranceType: InsuranceType;
}

/**
 * Normalized response format returned by the webhook service.
 * Standardizes external provider responses (n8n, Zapier) for consistent UI state handling.
 */
export interface LeadSubmissionResponse {
  success: boolean;
  message: string;
  timestamp: string;
}

/**
 * Configuration for Bento Grid cards displaying insurance services.
 */
export interface BentoCardData {
  id: string;
  title: string;
  description: string;
  category: InsuranceType;
  badge?: string;
  colSpanClass: string;
}
