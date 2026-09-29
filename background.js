// Receives reading time from the content script and shows it as a badge.
chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.type !== "reading-time" || !sender.tab) return;
  const tabId = sender.tab.id;

  if (msg.minutes === null) {
    chrome.action.setBadgeText({ tabId, text: "" });
    chrome.action.setTitle({ tabId, title: "Reading Time Badge" });
    return;
  }

  chrome.action.setBadgeText({ tabId, text: `${msg.minutes}m` });
  chrome.action.setBadgeBackgroundColor({ tabId, color: "#2563eb" });
  chrome.action.setTitle({
    tabId,
    title: `${msg.minutes} min read (${msg.words.toLocaleString()} words)`,
  });
});

// Clear the badge while a tab is loading a new page.
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === "loading") {
    chrome.action.setBadgeText({ tabId, text: "" });
  }
});
