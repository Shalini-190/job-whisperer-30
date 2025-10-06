console.log('[JobWhisperer] Background script loaded');

chrome.runtime.onInstalled.addListener(() => {
  console.log('[JobWhisperer] Extension installed');
});

// Optional: Add tab monitoring to show badge on job sites
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    const isJobSite = tab.url.includes('greenhouse.io') ||
                      tab.url.includes('lever.co') ||
                      tab.url.includes('workable.com') ||
                      tab.url.includes('apply') ||
                      tab.url.includes('careers') ||
                      tab.url.includes('jobs');

    if (isJobSite) {
      chrome.action.setBadgeText({ tabId, text: 'JOB' });
      chrome.action.setBadgeBackgroundColor({ tabId, color: '#667eea' });
    }
  }
});