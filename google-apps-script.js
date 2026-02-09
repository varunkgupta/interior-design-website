/**
 * Google Apps Script for Urban Lives Decor Contact Form
 * This script receives form submissions and sends them to your Gmail
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to https://script.google.com
 * 2. Click "New Project"
 * 3. Delete any existing code
 * 4. Paste this entire script
 * 5. Click "Deploy" > "New deployment"
 * 6. Select type: "Web app"
 * 7. Execute as: "Me"
 * 8. Who has access: "Anyone"
 * 9. Click "Deploy"
 * 10. Copy the Web App URL
 * 11. Paste it in contact-google-script.html where it says 'YOUR_GOOGLE_SCRIPT_URL_HERE'
 */

function doPost(e) {
  try {
    // Your email address
    const recipientEmail = "urbanlivesdecor@gmail.com";
    
    // Get form data
    const name = e.parameter.name || "Not provided";
    const email = e.parameter.email || "Not provided";
    const phone = e.parameter.phone || "Not provided";
    const projectType = e.parameter.project_type || "Not specified";
    const message = e.parameter.message || "No message";
    
    // Email subject
    const subject = "🏠 New Project Inquiry from Website - " + name;
    
    // Email body (Plain Text)
    const plainBody = 
      "NEW PROJECT INQUIRY FROM WEBSITE\n" +
      "================================\n\n" +
      "Contact Information:\n" +
      "-------------------\n" +
      "Name: " + name + "\n" +
      "Email: " + email + "\n" +
      "Phone: " + phone + "\n\n" +
      "Project Details:\n" +
      "---------------\n" +
      "Project Type: " + projectType + "\n\n" +
      "Message:\n" +
      message + "\n\n" +
      "-------------------\n" +
      "Submitted on: " + new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + "\n" +
      "Source: Website Contact Form";
    
    // Email body (HTML - prettier version)
    const htmlBody = 
      "<html><body style='font-family: Arial, sans-serif; color: #333;'>" +
      "<div style='max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;'>" +
      "<h2 style='color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px;'>🏠 New Project Inquiry</h2>" +
      
      "<div style='background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;'>" +
      "<h3 style='color: #2c3e50; margin-top: 0;'>Contact Information</h3>" +
      "<p><strong>Name:</strong> " + name + "</p>" +
      "<p><strong>Email:</strong> <a href='mailto:" + email + "'>" + email + "</a></p>" +
      "<p><strong>Phone:</strong> <a href='tel:" + phone + "'>" + phone + "</a></p>" +
      "</div>" +
      
      "<div style='background: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0;'>" +
      "<h3 style='color: #856404; margin-top: 0;'>Project Details</h3>" +
      "<p><strong>Project Type:</strong> " + projectType + "</p>" +
      "<p><strong>Message:</strong></p>" +
      "<p style='background: white; padding: 10px; border-left: 3px solid #ffc107;'>" + message.replace(/\n/g, '<br>') + "</p>" +
      "</div>" +
      
      "<div style='margin-top: 20px; padding-top: 15px; border-top: 1px solid #ddd; font-size: 12px; color: #666;'>" +
      "<p><strong>Submitted:</strong> " + new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + "</p>" +
      "<p><strong>Source:</strong> Website Contact Form</p>" +
      "</div>" +
      
      "</div>" +
      "</body></html>";
    
    // Send email
    GmailApp.sendEmail(recipientEmail, subject, plainBody, {
      htmlBody: htmlBody,
      name: "Urban Lives Decor Website"
    });
    
    // Optional: Log to Google Sheets for record keeping
    // Uncomment the lines below if you want to save submissions to a spreadsheet
    // logToSheet(name, email, phone, projectType, message);
    
    // Return success
    return ContentService.createTextOutput("Success");
    
  } catch (error) {
    // Log error
    Logger.log("Error: " + error.toString());
    return ContentService.createTextOutput("Error: " + error.toString());
  }
}

/**
 * Optional: Log submissions to Google Sheets
 * 
 * SETUP FOR GOOGLE SHEETS LOGGING:
 * 1. Create a new Google Sheet
 * 2. Name the first sheet "Contact Submissions"
 * 3. Add headers in row 1: Timestamp | Name | Email | Phone | Project Type | Message
 * 4. Get the Sheet ID from the URL (the long string between /d/ and /edit)
 * 5. Replace 'YOUR_SHEET_ID_HERE' below with your actual Sheet ID
 * 6. Uncomment the logToSheet() call in the doPost function above
 */
function logToSheet(name, email, phone, projectType, message) {
  try {
    const SHEET_ID = 'YOUR_SHEET_ID_HERE'; // Replace with your Google Sheet ID
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('Contact Submissions');
    
    const timestamp = new Date();
    sheet.appendRow([timestamp, name, email, phone, projectType, message]);
    
  } catch (error) {
    Logger.log("Sheet logging error: " + error.toString());
  }
}

/**
 * Test function - Run this to test if the script works
 * Click the "Run" button with this function selected
 */
function testEmail() {
  const testData = {
    parameter: {
      name: "Test User",
      email: "test@example.com",
      phone: "+91 98765 43210",
      project_type: "Residential Design",
      message: "This is a test message from the Google Apps Script."
    }
  };
  
  doPost(testData);
  Logger.log("Test email sent!");
}
