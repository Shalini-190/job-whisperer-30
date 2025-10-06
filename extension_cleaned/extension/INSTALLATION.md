# JobWhisperer AI Autofill Extension - Installation Guide

## Quick Start

### Step 1: Prepare Your JobWhisperer AI Account

1. **Sign up/Login** to [JobWhisperer AI](https://hlewejtogcgwmfrtkqef.supabase.co)
2. **Complete your profile** with:
   - Full name
   - Email address
   - Phone number
   - Location
   - LinkedIn URL (optional)
   - GitHub URL (optional)
   - Portfolio URL (optional)
   - Professional summary
3. **Generate AI answers** for common interview questions

### Step 2: Install the Extension

#### For Chrome:
1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top-right corner)
3. Click "Load unpacked"
4. Navigate to and select the `extension` folder from this repository
5. The extension should appear in your extensions list

#### For Edge:
1. Open Edge and go to `edge://extensions/`
2. Enable "Developer mode" (toggle in left sidebar)
3. Click "Load unpacked"
4. Navigate to and select the `extension` folder from this repository
5. The extension should appear in your extensions list

### Step 3: Pin the Extension

1. Click the extensions icon in your browser toolbar
2. Find "JobWhisperer AI Autofill"
3. Click the pin icon to keep it visible in your toolbar

### Step 4: Test the Extension

1. **Navigate to a job application page** (try Greenhouse or Lever)
2. **Click the JobWhisperer AI extension icon**
3. **Verify connection** - you should see:
   - Green dot indicating connection
   - Your name displayed
   - Profile information shown
4. **Click "🚀 Autofill Application"**
5. **Watch the magic happen** - form fields should fill automatically

## Testing on Different Platforms

### Greenhouse (Recommended for Testing)
- Go to any Greenhouse job application page
- Example: `https://boards-api.greenhouse.io/[company]/jobs/[job-id]`
- The extension should detect this as a Greenhouse platform

### Lever (Recommended for Testing)
- Go to any Lever job application page  
- Example: `https://jobs.lever.co/[company]/[job-id]`
- The extension should detect this as a Lever platform

### Generic Job Sites
- Try any job application form
- The extension will use generic field mappings
- May work on company career pages, LinkedIn, Indeed, etc.

## Troubleshooting Installation

### Extension Not Loading

**Error: "This extension may be corrupted"**
- Make sure you selected the `extension` folder, not the parent directory
- Check that all files are present in the extension folder

**Error: "Manifest file is missing or unreadable"**
- Ensure `manifest.json` exists in the extension folder
- Check file permissions

**Extension loads but doesn't work**
- Check browser console for errors (F12 → Console tab)
- Look for "JobWhisperer AI Autofill" messages
- Try refreshing the extension

### Connection Issues

**Red dot in extension popup**
- You're not logged into JobWhisperer AI
- Go to [JobWhisperer AI](https://hlewejtogcgwmfrtkqef.supabase.co) and log in
- Refresh the extension popup

**"No user profile found"**
- Complete your profile in JobWhisperer AI
- Make sure all required fields are filled
- Try clicking "🔄 Refresh Profile" in the extension

### Form Filling Issues

**No forms detected**
- Make sure you're on an actual job application page
- Some forms load dynamically - wait a few seconds
- Try refreshing the page

**Fields not filling**
- Check that your JobWhisperer AI profile has the required information
- Some custom forms may not be detected
- Check browser console for error messages

## Advanced Configuration

### Debug Mode

To enable detailed logging:

1. Open the extension popup
2. Click "⚙️ Settings" 
3. Enable debug mode (if available)
4. Open browser console (F12) to see detailed logs

### Custom Field Mappings

The extension automatically detects common field names, but you can modify the mappings in `content.js` if needed:

```javascript
// Edit the FIELD_MAPPINGS object in content.js
const FIELD_MAPPINGS = {
  yourPlatform: {
    firstName: ['your_custom_field_name'],
    lastName: ['your_custom_field_name'],
    // ... add other fields
  }
};
```

## Uninstalling

### Remove the Extension

1. Go to `chrome://extensions/` or `edge://extensions/`
2. Find "JobWhisperer AI Autofill"
3. Click "Remove"
4. Confirm removal

### Clean Up Data

The extension doesn't store personal data locally, but you can clear any cached data:

1. Go to browser settings
2. Clear browsing data
3. Select "Extensions" or "Cached images and files"

## Support

### Getting Help

If you encounter issues:

1. **Check the console logs** (F12 → Console)
2. **Take screenshots** of any error messages
3. **Note your browser version** and operating system
4. **Include the ATS platform** you're trying to use

### Common Solutions

**Extension icon not showing**
- Check if extension is enabled in `chrome://extensions/`
- Try pinning the extension to your toolbar

**Autofill not working on specific site**
- The site may use non-standard field names
- Check console logs for detection messages
- Try manually filling a few fields to see if the extension can detect them

**Profile data not loading**
- Ensure you're logged into JobWhisperer AI in the same browser
- Try logging out and back in
- Check your internet connection

## Next Steps

After successful installation:

1. **Test on multiple platforms** to ensure compatibility
2. **Update your JobWhisperer AI profile** regularly
3. **Generate new AI answers** for different types of questions
4. **Report any issues** you encounter

The extension will continue to work as long as:
- You maintain an active JobWhisperer AI account
- Your browser supports the extension
- The extension files remain intact

Happy job hunting with JobWhisperer AI! 🎯
