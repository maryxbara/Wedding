import { NextResponse } from "next/server";
import {
  checkRateLimit,
  validateRSVPData,
  submitRSVPToGoogleSheets,
  type RSVPData,
} from "@/lib/google-sheets";

export const dynamic = "force-dynamic";

// Request body type from frontend
type RSVPRequestBody = {
  fullName: string;
  attending: "Yes" | "No";
  guestsCount: number;
  additionalGuests: string[];
  dietaryPreferences: string;
};

export async function POST(req: Request) {
  try {
    // Get client identifier for rate limiting
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || "unknown";
    
    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please wait a moment before trying again." },
        { status: 429 }
      );
    }
    
    // Parse request body
    const body = (await req.json()) as Partial<RSVPRequestBody>;
    
    // Transform frontend data to backend format
    const rsvpData: RSVPData = {
      guest_full_name: String(body.fullName ?? "").trim(),
      attending_status: body.attending === "No" ? "no" : "yes",
      guests_count: Math.min(10, Math.max(1, Number(body.guestsCount) || 1)),
      additional_guests: Array.isArray(body.additionalGuests) 
        ? body.additionalGuests.map(g => String(g).trim()).filter(g => g.length > 0)
        : [],
      dietary_preferences: String(body.dietaryPreferences ?? "").trim(),
    };
    
    // Validate data
    const validation = validateRSVPData(rsvpData);
    if (!validation.valid) {
      return NextResponse.json(
        { ok: false, error: validation.error },
        { status: 400 }
      );
    }
    
    // Submit to Google Sheets
    const result = await submitRSVPToGoogleSheets(rsvpData);
    
    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: result.error || "Failed to submit RSVP" },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("RSVP submission error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
