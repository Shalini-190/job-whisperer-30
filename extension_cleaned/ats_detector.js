export class ATSDetector {
  static detect() {
    const url = window.location.href;
    const html = document.body.innerHTML;

    if (url.includes('greenhouse.io') || html.includes('id="greenhouse"')) return 'Greenhouse';
    if (url.includes('lever.co') || html.includes('id="lever"')) return 'Lever';
    if (url.includes('workday.com')) return 'Workday';
    if (url.includes('icims.com')) return 'iCIMS';
    if (url.includes('breezy.hr')) return 'BreezyHR';
    
    // Fallback heuristic detection for generic ATS
    if (html.includes('apply-button') && html.includes('resume-upload')) return 'Generic';

    return null;
  }
}
