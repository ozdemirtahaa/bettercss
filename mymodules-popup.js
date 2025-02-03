document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('darkModeToggle');

  // Read the stored dark mode value (default to false if not set)
  chrome.storage.local.get(['darkMode'], (result) => {
    const darkMode = result.darkMode || false;
    toggle.checked = darkMode;
  });

  // Listen for toggle changes
  toggle.addEventListener('change', () => {
    const isDark = toggle.checked;
    chrome.storage.local.set({ darkMode: isDark }, () => {
      console.log('Dark mode set to:', isDark);
      // Send a message to the active tab so its content script updates immediately
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
          chrome.tabs.sendMessage(tabs[0].id, { action: "updateTheme" });
        }
      });
    });
  });
});
