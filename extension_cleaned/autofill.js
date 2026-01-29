export class AutofillManager {
  static async fillField(selector, value, requireConfirmation = false) {
    const el = document.querySelector(selector);
    if (!el) {
      console.warn(`Autofill: Selector ${selector} not found`);
      return false;
    }

    if (requireConfirmation) {
      const confirm = window.confirm(`JobWhisperer AI wants to fill sensitive field with: ${value}. Allow?`);
      if (!confirm) return false;
    }

    el.value = value;
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
    return true;
  }

  static preventAccidentalSubmission() {
    const forms = document.querySelectorAll('form');
    forms.forEach(f => {
      f.addEventListener('submit', (e) => {
        if (f.dataset.jwValidated !== 'true') {
          e.preventDefault();
          alert('JobWhisperer AI: Please review all filled fields before submitting.');
          f.dataset.jwValidated = 'true';
        }
      });
    });
  }
}
