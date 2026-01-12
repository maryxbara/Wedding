/**
 * Google Apps Script - Wedding RSVP Backend
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Sheet named "Wedding Guests"
 * 2. Add these column headers in row 1 (exact order):
 *    A: timestamp
 *    B: guest_full_name
 *    C: attending_status
 *    D: guests_count
 *    E: additional_guests
 *    F: dietary_preferences
 * 
 * 3. Go to Extensions > Apps Script
 * 4. Delete any existing code and paste this entire file
 * 5. Click Deploy > New deployment
 * 6. Select type: Web app
 * 7. Execute as: Me
 * 8. Who has access: Anyone
 * 9. Click Deploy and copy the Web app URL
 * 10. Add the URL to your .env as GOOGLE_APPS_SCRIPT_URL
 * 11. Set RSVP_SECRET_KEY in both .env and in the CONFIG below
 */

// Configuration - UPDATE THESE VALUES
var CONFIG = {
  NOTIFICATION_EMAIL: "maryxbara@gmail.com",
  SECRET_KEY: "42a34e76e5116417585c0644536717a38b2c518918c04922f2f835343223cfb6",
  SHEET_NAME: "Wedding Guests",
  RATE_LIMIT_MINUTES: 1,
  MAX_GUESTS: 100
};

/**
 * Handle POST requests from the website
 */
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    
    // Validate secret key
    if (data.secretKey !== CONFIG.SECRET_KEY) {
      return createResponse(false, "Unauthorized", 401);
    }
    
    // Validate required fields
    if (!data.guest_full_name || typeof data.guest_full_name !== "string") {
      return createResponse(false, "Guest name is required", 400);
    }
    
    var guestName = data.guest_full_name.trim();
    if (guestName.length < 2 || guestName.length > 100) {
      return createResponse(false, "Guest name must be between 2 and 100 characters", 400);
    }
    
    // Validate attending status
    var attendingStatus = data.attending_status === "no" ? "no" : "yes";
    
    // Validate guests count
    var guestsCount = parseInt(data.guests_count) || 1;
    if (guestsCount < 1 || guestsCount > CONFIG.MAX_GUESTS) {
      return createResponse(false, "Guests count must be between 1 and " + CONFIG.MAX_GUESTS, 400);
    }
    
    // Validate additional guests
    var additionalGuests = [];
    if (data.additional_guests && Array.isArray(data.additional_guests)) {
      for (var i = 0; i < data.additional_guests.length; i++) {
        var guest = String(data.additional_guests[i]).trim();
        if (guest.length > 0 && guest.length <= 100) {
          additionalGuests.push(guest);
        }
      }
    }
    var additionalGuestsStr = additionalGuests.join(", ");
    
    // Validate dietary preferences
    var dietaryPreferences = "";
    if (data.dietary_preferences) {
      dietaryPreferences = String(data.dietary_preferences).trim();
      if (dietaryPreferences.length > 500) {
        return createResponse(false, "Dietary preferences must be under 500 characters", 400);
      }
    }
    
    // Get the spreadsheet and sheet
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME);
    
    if (!sheet) {
      // Create sheet if it doesn't exist
      sheet = spreadsheet.insertSheet(CONFIG.SHEET_NAME);
      sheet.appendRow([
        "timestamp",
        "guest_full_name", 
        "attending_status",
        "guests_count",
        "additional_guests",
        "dietary_preferences"
      ]);
    }
    
    // Check for rate limiting (same guest name within time window)
    var existingRow = findExistingGuest(sheet, guestName);
    if (existingRow !== -1) {
      var lastTimestamp = sheet.getRange(existingRow, 1).getValue();
      if (lastTimestamp) {
        var lastTime = new Date(lastTimestamp);
        var now = new Date();
        var diffMinutes = (now - lastTime) / (1000 * 60);
        
        if (diffMinutes < CONFIG.RATE_LIMIT_MINUTES) {
          return createResponse(false, "Please wait before submitting again", 429);
        }
      }
      
      // Update existing row
      var timestamp = new Date().toISOString();
      sheet.getRange(existingRow, 1, 1, 6).setValues([[
        timestamp,
        guestName,
        attendingStatus,
        guestsCount,
        additionalGuestsStr,
        dietaryPreferences
      ]]);
      
      // Send notification email
      sendNotificationEmail(guestName, attendingStatus, guestsCount, additionalGuests, dietaryPreferences, true);
      
      return createResponse(true, "RSVP updated successfully");
    }
    
    // Append new row
    var timestamp = new Date().toISOString();
    sheet.appendRow([
      timestamp,
      guestName,
      attendingStatus,
      guestsCount,
      additionalGuestsStr,
      dietaryPreferences
    ]);
    
    // Send notification email
    sendNotificationEmail(guestName, attendingStatus, guestsCount, additionalGuests, dietaryPreferences, false);
    
    return createResponse(true, "RSVP submitted successfully");
    
  } catch (error) {
    Logger.log("Error: " + error.toString());
    return createResponse(false, "Server error occurred", 500);
  }
}

/**
 * Find existing guest row by name (case-insensitive)
 */
function findExistingGuest(sheet, guestName) {
  var data = sheet.getDataRange().getValues();
  var normalizedName = guestName.toLowerCase().trim();
  
  for (var i = 1; i < data.length; i++) {
    if (data[i][1] && data[i][1].toString().toLowerCase().trim() === normalizedName) {
      return i + 1; // Return 1-indexed row number
    }
  }
  
  return -1;
}

/**
 * Send notification email to the couple
 */
function sendNotificationEmail(guestName, attendingStatus, guestsCount, additionalGuests, dietaryPreferences, isUpdate) {
  var subject = isUpdate 
    ? "Wedding RSVP Updated - " + guestName
    : "New Wedding RSVP - " + guestName;
  
  var attendingText = attendingStatus === "yes" ? "Yes, attending" : "No, not attending";
  
  var body = "Wedding RSVP " + (isUpdate ? "Update" : "Submission") + "\n";
  body += "================================\n\n";
  body += "Guest Name: " + guestName + "\n";
  body += "Attending: " + attendingText + "\n";
  body += "Total Guests: " + guestsCount + "\n";
  
  if (additionalGuests.length > 0) {
    body += "\nAdditional Guests:\n";
    for (var i = 0; i < additionalGuests.length; i++) {
      body += "  - " + additionalGuests[i] + "\n";
    }
  }
  
  if (dietaryPreferences) {
    body += "\nDietary Preferences:\n" + dietaryPreferences + "\n";
  }
  
  body += "\n================================\n";
  body += "Submitted at: " + new Date().toLocaleString() + "\n";
  
  try {
    MailApp.sendEmail({
      to: CONFIG.NOTIFICATION_EMAIL,
      subject: subject,
      body: body
    });
  } catch (emailError) {
    Logger.log("Email error: " + emailError.toString());
    // Don't fail the RSVP if email fails
  }
}

/**
 * Create JSON response
 */
function createResponse(success, message, statusCode) {
  var response = {
    ok: success,
    message: message
  };
  
  if (!success && statusCode) {
    response.statusCode = statusCode;
  }
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "Wedding RSVP API is running" }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Test function - run this to verify setup
 */
function testSetup() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME);
  
  if (!sheet) {
    sheet = spreadsheet.insertSheet(CONFIG.SHEET_NAME);
    sheet.appendRow([
      "timestamp",
      "guest_full_name",
      "attending_status", 
      "guests_count",
      "additional_guests",
      "dietary_preferences"
    ]);
    Logger.log("Created sheet: " + CONFIG.SHEET_NAME);
  } else {
    Logger.log("Sheet exists: " + CONFIG.SHEET_NAME);
  }
  
  Logger.log("Setup complete! Deploy as web app to get the URL.");
}
