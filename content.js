// Estimates reading time and reports it to the background worker.
const WORDS_PER_MINUTE = 238;
const MIN_WORDS = 200; // below this, the page probably isn't an article

function getMainText() {
  const root =
    document.querySelector("article") ||
    document.querySelector("main") ||
    document.body;
  return root ? root.innerText : "";
}

function report() {
  const text = getMainText().trim();
  const words = text ? text.split(/\s+/).length : 0;
  const minutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
  chrome.runtime.sendMessage({
    type: "reading-time",
    words,
    minutes: words >= MIN_WORDS ? minutes : null,
  });
}

report();

// Handle single-page apps that change content without a reload.
let lastUrl = location.href;
setInterval(() => {
  if (location.href !== lastUrl) {
    lastUrl = location.href;
    setTimeout(report, 1000);
  }
}, 1000);
