# Reading Time Badge

A lightweight Chrome/Edge extension that shows the estimated reading time of the current page right on the toolbar icon, so you can decide whether an article is worth your time before you start.

![Manifest V3](https://img.shields.io/badge/Manifest-V3-blue) ![License](https://img.shields.io/badge/license-MIT-green)

   ![Screenshot](screenshots/demo.png)

## Features

- Shows a badge like `6m` on the toolbar icon for the current tab
- Hover over the icon to see the exact word count
- Reads text from `<article>`, then `<main>`, then falls back to the full page
- Skips short pages (under 200 words) so search pages and dashboards stay clean
- Updates on single-page apps when the URL changes without a reload
- No tracking, no network requests, no extra permissions

## How it works

| File | Role |
| --- | --- |
| `manifest.json` | Extension config (Manifest V3) |
| `content.js` | Runs on each page, counts words, and calculates minutes at 238 words per minute |
| `background.js` | Service worker that receives the result and sets the badge and tooltip |
| `icons/` | Toolbar and store icons (16, 32, 48, 128 px) |

The content script sends the word count and estimated minutes to the background service worker, which updates the badge for that tab.

## Installation

### From source (Developer mode)

1. Clone or download this repository:
```bash
   git clone https://github.com/<your-username>/reading-time-badge.git
```
2. Open `chrome://extensions` (or `edge://extensions`).
3. Turn on **Developer mode**.
4. Click **Load unpacked** and select the folder that directly contains `manifest.json`.
5. Pin the extension from the puzzle-piece menu, then open a long article and reload the tab.

> Tabs that were already open before you installed the extension need a refresh before the badge appears.

## Configuration

Edit these values in `content.js`:

| Constant | Default | Description |
| --- | --- | --- |
| `WORDS_PER_MINUTE` | `238` | Average adult reading speed. Lower it for slower reading. |
| `MIN_WORDS` | `200` | Pages with fewer words show no badge. |

The badge color can be changed in `background.js` (`#2563eb` by default).

## Privacy

Everything runs locally in your browser. The extension counts the words on the page and displays the result. It does not store, collect, or transmit any page content or browsing data.

## Limitations

- The word count includes any visible text inside the chosen container, such as captions and sidebars inside `<article>`, so the estimate is approximate.
- The extension does not run on `chrome://` pages, the Chrome Web Store, or other pages where extensions are blocked.

## Roadmap

- [ ] Popup with word count and settings
- [ ] Custom reading speed in an options page
- [ ] Better main-content detection
- [ ] Firefox support

## Contributing

Issues and pull requests are welcome. For larger changes, please open an issue first to discuss what you'd like to change.

## License

[MIT](LICENSE)
