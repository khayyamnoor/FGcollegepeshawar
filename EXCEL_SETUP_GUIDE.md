# 📊 Excel Sheet Integration Setup Guide

This guide will help you set up the form to send data directly to your Excel sheet using Google Apps Script.

## 🚀 Quick Setup Steps

### Step 1: Create Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Copy the **Spreadsheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit
   ```

### Step 2: Set Up Google Apps Script
1. Go to [Google Apps Script](https://script.google.com)
2. Create a new project
3. Replace the default code with the content from `google-apps-script-excel.js`
4. Replace `YOUR_SPREADSHEET_ID` with your actual spreadsheet ID
5. Replace `your-email@gmail.com` with your email address

### Step 3: Deploy the Script
1. Click **Deploy** → **New deployment**
2. Choose **Web app**
3. Set access to **Anyone**
4. Click **Deploy**
5. Copy the **Web app URL**

### Step 4: Update JavaScript
1. Open `js/admission.js`
2. Replace `YOUR_SCRIPT_ID` with your actual script ID from the URL

## 📋 Detailed Instructions

### 🔧 Google Apps Script Setup

#### 1. Create the Script
```javascript
// Copy the entire content from google-apps-script-excel.js
// Replace YOUR_SPREADSHEET_ID with your actual spreadsheet ID
// Replace your-email@gmail.com with your email
```

#### 2. Deploy Settings
- **Execute as**: Me
- **Who has access**: Anyone
- **Type**: Web app

#### 3. Test the Setup
1. Run the `setupSheetHeaders()` function once
2. Run the `testSetup()` function to test
3. Check your Excel sheet for the test data

### 📊 Excel Sheet Structure

The script will create these columns automatically:

| Column | Field | Description |
|--------|-------|-------------|
| A | Timestamp | Auto-generated timestamp |
| B | Full Name | Applicant's full name |
| C | Father's Name | Father's name |
| D | Date of Birth | Birth date |
| E | Gender | Male/Female/Other |
| F | CNIC | CNIC number |
| G | Nationality | Nationality |
| H | Religion | Religion |
| I | Domicile | Domicile |
| J | Address | Permanent address |
| K | Phone Number | Mobile number |
| L | Email | Email address |
| M | Guardian's Phone | Guardian's contact |
| N | Emergency Contact | Emergency contact |
| O | Matric Board | Matriculation board |
| P | Matric Year | Matriculation year |
| Q | Matric Roll No | Matriculation roll number |
| R | Matric Institute | Matriculation institute |
| S | Matric Total Marks | Total marks in matric |
| T | Matric Obtained Marks | Obtained marks in matric |
| U | Matric Percentage | Calculated percentage |
| V | Intermediate Board | Intermediate board |
| W | Intermediate Year | Intermediate year |
| X | Intermediate Roll No | Intermediate roll number |
| Y | Intermediate Institute | Intermediate institute |
| Z | Intermediate Total Marks | Total marks in intermediate |
| AA | Intermediate Obtained Marks | Obtained marks in intermediate |
| AB | Intermediate Percentage | Calculated percentage |
| AC | Program Level | Intermediate/BS |
| AD | Program Choice | Selected program |
| AE | Program Reason | Why this program |
| AF | Blood Group | Blood group |
| AG | Hafiz-e-Quran | Yes/No |
| AH | Disabilities | Any disabilities |
| AI | Medical Conditions | Medical conditions |
| AJ | Declaration Agreed | Yes/No |
| AK | Submission Date | Date submitted |
| AL | Submission Time | Time submitted |
| AM | Reference Number | Auto-generated reference |

### 🔄 Fallback Methods

The system includes multiple fallback methods:

1. **Primary**: Google Apps Script → Excel Sheet
2. **Secondary**: Formspree (if Google Apps Script fails)
3. **Tertiary**: Local Storage (offline mode)

### 📧 Email Notifications

The script will send email notifications for each submission:

- **Recipient**: Your email address
- **Subject**: "New Application Submission - FG College"
- **Content**: Basic applicant details and reference number

### 🛠️ Troubleshooting

#### Common Issues:

1. **"Script not found" error**
   - Check the script URL in `admission.js`
   - Ensure the script is deployed as a web app

2. **"Spreadsheet not found" error**
   - Verify the spreadsheet ID
   - Ensure the script has access to the spreadsheet

3. **"Permission denied" error**
   - Check that the script is deployed with "Anyone" access
   - Verify the script is set to execute as "Me"

4. **Data not appearing in Excel**
   - Run `setupSheetHeaders()` function
   - Check the script logs for errors
   - Verify the spreadsheet ID is correct

#### Testing:

1. **Test the script**: Run `testSetup()` function
2. **Test the form**: Submit a test application
3. **Check Excel**: Verify data appears in the sheet
4. **Check email**: Verify notification emails are received

### 🔒 Security Considerations

1. **Spreadsheet Access**: Only you should have edit access
2. **Script Permissions**: Deploy with minimal required permissions
3. **Data Validation**: The form includes comprehensive validation
4. **Backup**: Data is stored locally as backup

### 📈 Monitoring

1. **Check submission logs**: View script execution logs
2. **Monitor Excel sheet**: Watch for new submissions
3. **Email notifications**: Receive instant alerts
4. **Local storage**: Check browser storage for offline submissions

## ✅ Success Indicators

When everything is working correctly:

- ✅ Form submissions appear in Excel sheet
- ✅ Email notifications are received
- ✅ Reference numbers are generated
- ✅ Data is properly formatted
- ✅ Headers are set up correctly

## 🆘 Support

If you encounter issues:

1. Check the browser console for JavaScript errors
2. Check Google Apps Script logs for server errors
3. Verify all URLs and IDs are correct
4. Test with a simple submission first

---

**Need help?** Check the troubleshooting section or test with the provided test functions. 