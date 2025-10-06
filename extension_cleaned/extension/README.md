# JobWhisperer AI Autofill Extension

A Chrome/Edge browser extension that automatically fills job application forms using your JobWhisperer AI profile and generated answers.

## Features

- 🎯 **Smart Form Detection**: Automatically detects job application forms on various ATS platforms
- 📝 **Profile Autofill**: Fills forms with your JobWhisperer AI profile information
- 🤖 **AI Answer Integration**: Uses your AI-generated answers for interview questions
- 🏢 **ATS Platform Support**: Optimized for Greenhouse, Lever, Workable, SmartRecruiters, and Jobvite
- 🔍 **Dynamic Field Mapping**: Uses intelligent selectors to find form fields
- ⚡ **Real-time Processing**: Handles dynamically loaded forms
- 🐛 **Debug Logging**: Console logs for troubleshooting

## Supported ATS Platforms

- **Greenhouse** - Full support with optimized field mappings
- **Lever** - Full support with optimized field mappings  
- **Workable** - Generic support with common field mappings
- **SmartRecruiters** - Generic support with common field mappings
- **Jobvite** - Generic support with common field mappings
- **Generic Forms** - Works on any job application page

## Installation

### Method 1: Load as Unpacked Extension (Development)

1. **Download the Extension**
   ```bash
   # Clone the repository or download the extension folder
   git clone https://github.com/Shalini-190/job-whisperer-30.git
   cd job-whisperer-30/extension
   ```

2. **Open Chrome/Edge Extensions Page**
   - Chrome: Go to `chrome://extensions/`
   - Edge: Go to `edge://extensions/`

3. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top-right corner

4. **Load the Extension**
   - Click "Load unpacked"
   - Select the `extension` folder from the repository
   - The extension should now appear in your extensions list

5. **Pin the Extension**
   - Click the extensions icon in your browser toolbar
   - Pin "JobWhisperer AI Autofill" for easy access

### Method 2: Manual Installation

1. Download the `extension` folder
2. Open Chrome/Edge and navigate to extensions page
3. Enable Developer mode
4. Click "Load unpacked" and select the extension folder

## Usage

### Prerequisites

1. **JobWhisperer AI Account**: You need an active account at [JobWhisperer AI](https://hlewejtogcgwmfrtkqef.supabase.co)
2. **Complete Profile**: Fill out your profile information in JobWhisperer AI
3. **Generated Answers**: Create AI-generated answers for common interview questions

### How to Use

1. **Navigate to Job Application Page**
   - Go to any job application page on supported ATS platforms
   - The extension icon will show "AI" badge when a job page is detected

2. **Open Extension Popup**
   - Click the JobWhisperer AI Autofill extension icon
   - Check that your profile is loaded (green dot indicates connection)

3. **Autofill Form**
   - Click "🚀 Autofill Application" button
   - The extension will automatically fill all detected form fields
   - Filled fields will be highlighted with a blue border

4. **Review and Submit**
   - Review the filled information
   - Make any necessary adjustments
   - Submit the application as normal

### Field Mapping

The extension automatically maps your JobWhisperer AI profile to common form fields:

| Profile Field | Form Fields |
|---------------|-------------|
| Full Name | first_name, firstname, firstName, given_name |
| Email | email, email_address, email-address |
| Phone | phone, phone_number, telephone, mobile |
| Location | location, city, address, zip_code |
| LinkedIn | linkedin_url, linkedin_profile, linkedin |
| GitHub | github_url, github_profile, github |
| Portfolio | portfolio_url, website, personal_website |
| Summary | summary, bio, about, cover_letter |

## Troubleshooting

### Extension Not Working

1. **Check Connection Status**
   - Open the extension popup
   - Ensure you see a green dot and your name
   - If red dot appears, you're not logged into JobWhisperer AI

2. **Refresh Profile**
   - Click "🔄 Refresh Profile" in the extension popup
   - This will reload your profile data from JobWhisperer AI

3. **Check Console Logs**
   - Open Developer Tools (F12)
   - Look for "JobWhisperer AI Autofill" messages
   - Check for any error messages

### Fields Not Filling

1. **Manual Field Detection**
   - The extension uses dynamic selectors to find fields
   - Some custom forms may not be detected automatically

2. **Check Field Names**
   - Inspect the form fields to see their names/IDs
   - The extension looks for common field name patterns

3. **ATS Platform Support**
   - Some ATS platforms may use non-standard field names
   - The extension includes generic fallbacks for unknown platforms

### Performance Issues

1. **Disable on Non-Job Pages**
   - The extension only activates on job application pages
   - It automatically detects and disables on other sites

2. **Clear Extension Data**
   - Go to `chrome://extensions/`
   - Find JobWhisperer AI Autofill
   - Click "Remove" and reinstall if needed

## Development

### File Structure

```
extension/
├── manifest.json          # Extension configuration
├── popup.html            # Extension popup UI
├── popup.js              # Popup functionality
├── background.js         # Background service worker
├── content.js            # Content script for form filling
├── styles.css            # Extension styles
├── icons/                # Extension icons
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
└── README.md             # This file
```

### Adding New ATS Platforms

1. **Update Field Mappings**
   ```javascript
   // In content.js, add to FIELD_MAPPINGS
   newPlatform: {
     firstName: ['field_name_1', 'field_name_2'],
     lastName: ['last_name', 'surname'],
     // ... other fields
   }
   ```

2. **Update Platform Detection**
   ```javascript
   // In detectATSPlatform() function
   if (hostname.includes('newplatform.com')) {
     return 'newPlatform';
   }
   ```

3. **Test Thoroughly**
   - Test on actual application pages
   - Verify field detection works
   - Check console logs for issues

## Privacy & Security

- **Local Processing**: All form filling happens locally in your browser
- **No Data Collection**: The extension doesn't collect or store your personal data
- **Secure Connection**: Uses HTTPS for all JobWhisperer AI communications
- **Permissions**: Only requests necessary permissions for form filling

## Support

### Common Issues

1. **"No user profile found"**
   - Ensure you're logged into JobWhisperer AI
   - Complete your profile information
   - Try refreshing the profile in the extension popup

2. **"No forms found on this page"**
   - The page may not be a job application form
   - Try refreshing the page
   - Check if the form loads dynamically

3. **Fields filled incorrectly**
   - Review your JobWhisperer AI profile
   - Update incorrect information
   - The extension uses your profile data exactly as entered

### Getting Help

1. **Check Console Logs**
   - Open Developer Tools (F12)
   - Look for error messages
   - Take screenshots of any errors

2. **Contact Support**
   - Include your browser version
   - Include the ATS platform you're using
   - Include any error messages from the console

## Changelog

### Version 1.0.0
- Initial release
- Support for Greenhouse and Lever ATS platforms
- Basic form field detection and filling
- JobWhisperer AI profile integration
- Debug logging and error handling

## License

This extension is part of the JobWhisperer AI project. Please refer to the main project for licensing information.
