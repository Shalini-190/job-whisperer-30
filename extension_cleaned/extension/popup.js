console.log('JobWhisperer AI Autofill: Popup loaded');

const output = document.getElementById('output');
const fetchBtn = document.getElementById('fetchBtn');
const autofillBtn = document.getElementById('autofillBtn');

const SUPABASE_URL = '${SECRET_2}';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhsZXdlanRvZ2Nnd21mcnRrcWVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwNjQ2MjksImV4cCI6MjA3NDY0MDYyOX0.Pl6Cns8sizTaP61QbqDl3H0KM_0kqevg31iNA54Vq5I';

let profileData = null;

// Fetch all profiles
fetchBtn.addEventListener('click', async () => {
  output.textContent = 'Fetching profiles...';
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/profiles?select=*`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);

    const data = await res.json();
    if (data.length === 0) {
      output.textContent = 'No profiles found.';
      return;
    }

    profileData = data[0]; // pick the first profile for autofill
    output.textContent = JSON.stringify(profileData, null, 2);
  } catch (err) {
    output.textContent = 'Error: ' + err.message;
  }
});

// Autofill fields on the active tab
autofillBtn.addEventListener('click', async () => {
  if (!profileData) {
    output.textContent = 'Fetch profiles first!';
    return;
  }

  output.textContent = 'Autofilling form...';

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: (profile) => {
        const mappings = {
          name: profile.full_name,
          fullname: profile.full_name,
          full_name: profile.full_name,
          email: profile.email,
          phone: profile.phone,
          location: profile.location,
          linkedin: profile.linkedin_url,
          github: profile.github_url,
          portfolio: profile.portfolio_url,
          summary: profile.summary,
        };

        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach((input) => {
          const key = input.name?.toLowerCase() || input.id?.toLowerCase() || '';
          for (const field in mappings) {
            if (key.includes(field) && mappings[field]) {
              input.value = mappings[field];
              input.dispatchEvent(new Event('input', { bubbles: true }));
            }
          }
        });
        alert('✅ Autofill complete!');
      },
      args: [profileData],
    });
  });
});
