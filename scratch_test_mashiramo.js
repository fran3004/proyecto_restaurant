const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

async function testMashiramoView() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const port = 9831;
  const userDataDir = 'C:\\Users\\Yepin\\AppData\\Local\\Temp\\edge-test-' + port;

  const edge = spawn(edgePath, [
    '--headless=new',
    '--window-size=1280,800',
    '--remote-debugging-port=' + port,
    '--user-data-dir=' + userDataDir,
    'about:blank'
  ]);

  let list = null;
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 200));
    try {
      list = await new Promise((resolve, reject) => {
        http.get('http://127.0.0.1:' + port + '/json/list', r => {
          let d = '';
          r.on('data', c => d += c);
          r.on('end', () => resolve(JSON.parse(d)));
        }).on('error', reject);
      });
      if (list && list.length) break;
    } catch(e) {}
  }

  const page = list.find(t => t.type === 'page');
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise(r => ws.onopen = r);

  let id = 1;
  const callbacks = new Map();
  function send(method, params = {}) {
    return new Promise(resolve => {
      const curId = id++;
      callbacks.set(curId, resolve);
      ws.send(JSON.stringify({ id: curId, method, params }));
    });
  }
  ws.onmessage = (e) => {
    const d = JSON.parse(e.data);
    if (d.id && callbacks.has(d.id)) {
      callbacks.get(d.id)(d.result);
      callbacks.delete(d.id);
    }
  };

  await send('Page.navigate', { url: 'http://localhost:3000/proyecto_restaurant/brochure/mapa-3d.html' });
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 500));
    const r = await send('Runtime.evaluate', { expression: 'typeof mapLoaded !== "undefined" && mapLoaded', returnByValue: true });
    if (r && r.result && r.result.value) break;
  }

  for (const b of [140, 160, 180, 210]) {
    await send('Runtime.evaluate', {
      expression: `(() => {
        const s = STOPS['mashiramo'];
        currentSelectedStop = s;
        highlightMarker(s.id);
        showPanel(s);
        colibri.setLngLat([s.lng, s.lat]);
        colibri.setOffset([0, -52]);
        colibriEl.classList.remove('flying');
        colibriEl.classList.add('landed');
        traerColibriAlFrente();
        map.jumpTo({
          center: [s.lng, s.lat],
          padding: { top: 120, bottom: 40, left: 40, right: 330 },
          zoom: 16.2,
          pitch: 45,
          bearing: ${b}
        });
      })()`
    });

    await new Promise(r => setTimeout(r, 1000));

    const shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`C:\\Users\\Yepin\\.gemini\\antigravity\\brain\\8a32aeb9-8822-4c8f-89c2-15c28cd923f7\\mashiramo_bearing_${b}.png`, Buffer.from(shot.data, 'base64'));
    console.log(`Saved mashiramo_bearing_${b}.png`);
  }

  await send('Page.close');
  ws.close();
  edge.kill();
}

testMashiramoView().catch(console.error);
