const { spawn } = require('child_process');
const http = require('http');

async function inspectArea() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const port = 9807;
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

  // Set map center to photours and get unproject of the parking lot
  const evalRes = await send('Runtime.evaluate', {
    expression: `(() => {
      map.jumpTo({ center: [-73.020473, 10.394568], zoom: 17.5, pitch: 0, bearing: 0 });
      const currentPhotours = STOPS.photours;
      const cachedPhotoursEnd = PRECOMPUTED_ROUTES['villa->photours'].slice(-1)[0];
      return { currentPhotours, cachedPhotoursEnd };
    })()`,
    returnByValue: true
  });
  console.log('Photours info:', evalRes.result.value);

  await send('Page.close');
  ws.close();
  edge.kill();
}

inspectArea().catch(console.error);
