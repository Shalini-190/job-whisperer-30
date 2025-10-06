console.log('[JobWhisperer] Content script loaded');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('[JobWhisperer] Received message:', request.action);

  if (request.action === 'getAuthToken') {
    try {
      const authKey = 'sb-hlewejtogcgwmfrtkqef-auth-token';
      const authDataStr = localStorage.getItem(authKey);
      
      if (authDataStr) {
        const authData = JSON.parse(authDataStr);
        const token = authData.access_token;
        
        if (token) {
          console.log('[JobWhisperer] Token found, length:', token.length);
          sendResponse({ success: true, token: token });
        } else {
          sendResponse({ success: false, error: 'No access_token in stored data' });
        }
      } else {
        sendResponse({ success: false, error: 'Not logged in - no auth data' });
      }
    } catch (error) {
      console.error('[JobWhisperer] Error getting token:'${SECRET_1}'autofill') {
    try {
      const count = autofillForms(request.data);
      sendResponse({ success: true, count });
    } catch (error) {
      console.error('[JobWhisperer] Autofill error:', error);
      sendResponse({ success: false, error: error.message });
    }
    return true;
  }
});

function autofillForms(data) {
  const profile = data.userProfile;
  const education = data.education || [];
  const skills = data.skills || [];
  const workExperience = data.workExperience || [];

  let filledCount = 0;

  // Personal Information
  filledCount += fillFields([
    'first_name', 'firstname', 'first-name', 'fname', 'given_name'
  ], profile.full_name ? profile.full_name.split(' ')[0] : '');

  filledCount += fillFields([
    'last_name', 'lastname', 'last-name', 'lname', 'family_name', 'surname'
  ], profile.full_name ? profile.full_name.split(' ').slice(1).join(' ') : '');

  filledCount += fillFields([
    'name', 'full_name', 'fullname', 'full-name'
  ], profile.full_name || '');

  filledCount += fillFields([
    'email', 'email_address', 'e-mail', 'mail'
  ], profile.email || '');

  filledCount += fillFields([
    'phone', 'phone_number', 'telephone', 'mobile', 'tel', 'phone-number'
  ], profile.phone || '');

  filledCount += fillFields([
    'location', 'address', 'city'
  ], profile.location || '');

  filledCount += fillFields([
    'linkedin', 'linkedin_url', 'linkedin-url', 'linkedin_profile'
  ], profile.linkedin_url || '');

  filledCount += fillFields([
    'github', 'github_url', 'github-url', 'github_profile'
  ], profile.github_url || '');

  filledCount += fillFields([
    'portfolio', 'website', 'portfolio_url', 'personal_website'
  ], profile.portfolio_url || '');

  filledCount += fillFields([
    'summary', 'bio', 'about', 'cover_letter', 'additional_info'
  ], profile.summary || '');

  // Education
  if (education.length > 0) {
    const edu = education[0];
    filledCount += fillFields([
      'school', 'university', 'college', 'institution', 'education'
    ], edu.institution || '');

    filledCount += fillFields([
      'degree', 'education_level', 'qualification'
    ], edu.degree || '');

    filledCount += fillFields([
      'field_of_study', 'major', 'study_field'
    ], edu.field_of_study || '');
  }

  // Skills
  if (skills.length > 0) {
    const skillsList = skills.map(s => s.skill_name).join(', ');
    filledCount += fillFields([
      'skills', 'technical_skills', 'competencies'
    ], skillsList);
  }

  // Work Experience
  if (workExperience.length > 0) {
    const work = workExperience[0];
    filledCount += fillFields([
      'company', 'employer', 'organization', 'current_company'
    ], work.company || '');

    filledCount += fillFields([
      'title', 'job_title', 'position', 'role', 'current_title'
    ], work.title || '');

    filledCount += fillFields([
      'job_description', 'responsibilities', 'job_summary'
    ], work.description || '');
  }

  console.log(`[JobWhisperer] Filled ${filledCount} fields`);
  return filledCount;
}

function fillFields(fieldNames, value) {
  if (!value) return 0;
  
  let count = 0;

  fieldNames.forEach(name => {
    // Try exact matches first
    const exactSelectors = [
      `input[name="${name}"]`,
      `input[id="${name}"]`,
      `textarea[name="${name}"]`,
      `textarea[id="${name}"]`
    ];

    exactSelectors.forEach(selector => {
      try {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          if (!el.value || el.value.trim() === '') {
            el.value = value;
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
            el.dispatchEvent(new Event('blur', { bubbles: true }));
            count++;
            console.log(`[JobWhisperer] Filled ${selector} with: ${value.substring(0, 20)}...`);
          }
        });
      } catch (e) {
        // Ignore errors
      }
    });

    // Try partial matches
    const partialSelectors = [
      `input[name*="${name}"]`,
      `input[id*="${name}"]`,
      `textarea[name*="${name}"]`,
      `textarea[id*="${name}"]`
    ];

    partialSelectors.forEach(selector => {
      try {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          if (!el.value || el.value.trim() === '') {
            el.value = value;
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
            el.dispatchEvent(new Event('blur', { bubbles: true }));
            count++;
            console.log(`[JobWhisperer] Filled ${selector} (partial) with: ${value.substring(0, 20)}...`);
          }
        });
      } catch (e) {
        // Ignore errors
      }
    });
  });

  return count;
}