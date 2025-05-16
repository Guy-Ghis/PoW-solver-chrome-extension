const countEl = document.getElementById('count');
const resultEl = document.getElementById('result');
const historyTable = document.getElementById('history');
const startBtn = document.getElementById('start');

// Load history on popup open
chrome.storage.local.get({ history: [] }, (data) => {
  data.history.forEach((item) => appendHistoryRow(item));
});

document.getElementById('start').addEventListener('click', () => {
  const challenge = document.getElementById('challenge').value;
  const difficulty = parseInt(document.getElementById('difficulty').value, 10);

  if (!challenge || difficulty < 1) {
    alert('Please enter a valid challenge and difficulty.');
    return;
  }

  countEl.textContent = '0';
  resultEl.textContent = '';
  startBtn.disabled = true;

  chrome.runtime.sendMessage({ cmd: 'startPoW', challenge, difficulty });
});

document.getElementById('clear').addEventListener('click', () => {
  chrome.storage.local.set({ history: [] }, () => {
    historyTable.innerHTML =
      '<tr><th>Chal.</th><th>Nonce</th><th>Hash</th><th>Time</th></tr>';
  });
});

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'count') {
    countEl.textContent = msg.value;
  }
  if (msg.type === 'done') {
    resultEl.textContent = `Nonce=${msg.nonce}, Hash=${msg.hash}`;
    const record = {
      challenge: msg.challenge,
      nonce: msg.nonce,
      hash: msg.hash,
      time: msg.time,
    };
    appendHistoryRow(record);
    startBtn.disabled = false;
  }
});

function appendHistoryRow({ challenge, nonce, hash, time }) {
  const tr = document.createElement('tr');
  [challenge, nonce, hash, new Date(time).toLocaleString()].forEach((txt) => {
    const td = document.createElement('td');
    td.textContent = txt;
    tr.appendChild(td);
  });
  historyTable.appendChild(tr);
}
