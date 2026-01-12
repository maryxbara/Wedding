/**
 * Google Sheets RSVP Client
 * Sends RSVP data to Google Apps Script backend
 */

export type RSVPData = {
  guest_full_name: string;
  attending_status: "yes" | "no";
  guests_count: number;
  additional_guests: string[];
  dietary_preferences: string;
};

type GoogleAppsScriptResponse = {
  ok: boolean;
  message: string;
  statusCode?: number;
};

// In-memory rate limiting for the API route
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3;

/**
 * Check rate limit for a given identifier
 */
export function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  
  // Clean up old entries
  for (const [key, timestamp] of rateLimitMap.entries()) {
    if (timestamp < windowStart) {
      rateLimitMap.delete(key);
    }
  }
  
  const recentRequests = Array.from(rateLimitMap.entries())
    .filter(([key, timestamp]) => key.startsWith(identifier) && timestamp > windowStart)
    .length;
  
  if (recentRequests >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }
  
  rateLimitMap.set(`${identifier}-${now}`, now);
  return true;
}

/**
 * Validate RSVP data on the server side
 */
export function validateRSVPData(data: Partial<RSVPData>): { valid: boolean; error?: string } {
  // Validate guest name
  if (!data.guest_full_name || typeof data.guest_full_name !== "string") {
    return { valid: false, error: "Guest name is required" };
  }
  
  const guestName = data.guest_full_name.trim();
  if (guestName.length < 2) {
    return { valid: false, error: "Guest name must be at least 2 characters" };
  }
  if (guestName.length > 100) {
    return { valid: false, error: "Guest name must be under 100 characters" };
  }
  
  // Validate name format (letters, spaces, hyphens, apostrophes only)
  const nameRegex = /^[a-zA-Z\u00C0-\u024F\u0400-\u04FF\s'-]+$/;
  if (!nameRegex.test(guestName)) {
    return { valid: false, error: "Guest name contains invalid characters" };
  }
  
  // Validate attending status
  if (data.attending_status !== "yes" && data.attending_status !== "no") {
    return { valid: false, error: "Attending status must be yes or no" };
  }
  
  // Validate guests count
  if (typeof data.guests_count !== "number" || data.guests_count < 1 || data.guests_count > 10) {
    return { valid: false, error: "Guests count must be between 1 and 10" };
  }
  
  // Validate additional guests
  if (data.additional_guests && Array.isArray(data.additional_guests)) {
    for (const guest of data.additional_guests) {
      if (typeof guest !== "string") {
        return { valid: false, error: "Additional guest names must be strings" };
      }
      const trimmedGuest = guest.trim();
      if (trimmedGuest.length > 100) {
        return { valid: false, error: "Additional guest name must be under 100 characters" };
      }
      if (trimmedGuest.length > 0 && !nameRegex.test(trimmedGuest)) {
        return { valid: false, error: "Additional guest name contains invalid characters" };
      }
    }
  }
  
  // Validate dietary preferences
  if (data.dietary_preferences) {
    if (typeof data.dietary_preferences !== "string") {
      return { valid: false, error: "Dietary preferences must be a string" };
    }
    if (data.dietary_preferences.length > 500) {
      return { valid: false, error: "Dietary preferences must be under 500 characters" };
    }
  }
  
  return { valid: true };
}

/**
 * Send RSVP data to Google Apps Script
 */
export async function submitRSVPToGoogleSheets(data: RSVPData): Promise<{ ok: boolean; error?: string }> {
  const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
  const secretKey = process.env.RSVP_SECRET_KEY;
  
  if (!scriptUrl) {
    throw new Error("GOOGLE_APPS_SCRIPT_URL environment variable is not set");
  }
  
  if (!secretKey) {
    throw new Error("RSVP_SECRET_KEY environment variable is not set");
  }
  
  const payload = {
    secretKey,
    guest_full_name: data.guest_full_name.trim(),
    attending_status: data.attending_status,
    guests_count: data.guests_count,
    additional_guests: data.additional_guests.map(g => g.trim()).filter(g => g.length > 0),
    dietary_preferences: data.dietary_preferences?.trim() || "",
  };
  
  const response = await fetch(scriptUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    redirect: "follow",
  });
  
  const text = await response.text();
  
  // Check if response is HTML (error page) instead of JSON
  if (text.startsWith("<!DOCTYPE") || text.startsWith("<html")) {
    console.error("Google Apps Script returned HTML instead of JSON. The deployment may not be configured for public access.");
    throw new Error("RSVP service is temporarily unavailable. Please try again later.");
  }
  
  if (!response.ok) {
    throw new Error(`RSVP submission failed. Please try again.`);
  }
  
  try {
    const result = JSON.parse(text) as GoogleAppsScriptResponse;
    
    if (!result.ok) {
      return { ok: false, error: result.message || "Submission failed" };
    }
    
    return { ok: true };
  } catch {
    console.error("Failed to parse Google Apps Script response:", text);
    throw new Error("RSVP service error. Please try again later.");
  }
}
