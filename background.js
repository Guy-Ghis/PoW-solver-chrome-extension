// Utility: compute SHA-256 of a string, return hex
async function sha256hex(str) {
  const buf = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(str)
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

chrome.runtime.onMessage.addListener((msg, sender, respond) => {
  if (msg.cmd !== 'startPoW') return;

  const { challenge, difficulty } = msg;
  const prefix = '0'.repeat(difficulty);
  let nonce = 0;

  async function mine() {
    for (let i = 0; i < 1000; i++, nonce++) {
      const hash = await sha256hex(challenge + nonce);
      if (hash.startsWith(prefix)) {
        const time = Date.now();
        chrome.storage.local.get({ history: [] }, (data) => {
          const history = data.history;
          history.push({ challenge, nonce, hash, time });
          if (history.length > 100) history.shift(); // optional: cap history
          chrome.storage.local.set({ history });
        });
        chrome.runtime.sendMessage({
          type: 'done',
          challenge,
          nonce,
          hash,
          time,
        });
        return;
      }
    }
    chrome.runtime.sendMessage({ type: 'count', value: nonce });
    setTimeout(mine, 0);
  }

  mine();
});
