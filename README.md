# PoW Solver Chrome Extension

This is a Chrome extension that demonstrates a simple **Proof of Work (PoW)** system using SHA-256 hashing. Users can input a challenge string and difficulty level, and the extension will compute a numeric nonce such that the SHA-256 hash of `challenge + nonce` starts with a certain number of leading zeroes in hexadecimal.

---
## Features
- Input a challenge string and difficulty level (number of leading zero hex digits)
- Compute valid nonce using brute-force search
- Live progress counter while computing
- Displays final nonce and resulting hash
- Saves each solved challenge with timestamp to local storage
- Displays a table of all past solutions (challenge, nonce, hash, time)
- Option to clear solution history

---
## Example
- **Challenge**: `CS`
- **Difficulty**: `2`
- Finds a nonce such that `SHA-256("CS" + nonce)` starts with `00`.

---
## Requirements
- Google Chrome (latest version)

---
## Installation
1. Clone or download this repository.
```bash
git clone https://github.com/Guy-Ghis/PoW-solver-chrome-extension.git
```
2. Open Chrome and navigate to `chrome://extensions/`

3. Enable Developer Mode (top-right corner).

4. Click "**Load unpacked**".

5. Select the project folder (`pow-solver-chrome-extension/`).

6. Click the extension icon in the toolbar to open the popup.

---
## Usage
1. Enter a **challenge string** (e.g., `"Hello"`).

2. Enter a **difficulty** level (e.g., `2` for two leading zeroes).

3. Click "**Compute PoW**".

4. Watch the **Attempts** counter increase.

5. Once a matching hash is found, the result is displayed.

6. Your solved challenge is saved and shown in the **History** table.

7. Click the "**Clear History**" button to remove all past PoW solutions.

---

## License
This project is licensed under the MIT License. See LICENSE file.