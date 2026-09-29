const { spawn } = require('child_process');
const http = require('http');

async function check() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const port = 9804;
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
    const r = await send('Runtime.evaluate', { expression: 'typeof mapLoaded !== "undefined" && mapLoaded' });
    if (r && r.result && r.result.value) break;
  }

  // Trigger flight to pinos
  await send('Runtime.evaluate', { expression: 'seleccionarDestino("pinos")' });
  
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 1000));
    const r = await send('Runtime.evaluate', {
      expression: 'colibriEl.classList.contains("landed") && currentSelectedStop && currentSelectedStop.id === "pinos"'
    });
    if (r && r.result && r.result.value) break;
  }

  await new Promise(r => setTimeout(r, 1000));

  const result = await send('Runtime.evaluate', {
    expression: `(() => {
      const m = markers['pinos'];
      const mCoords = m ? { lng: m.getLngLat().lng, lat: m.getLngLat().lat } : null;
      const colCoords = colibri ? { lng: colibri.getLngLat().lng, lat: colibri.getLngLat().lat } : null;
      const src = map.getSource('active-route-line');
      const data = src ? src._data : null;
      const coords = (data && data.geometry) ? data.geometry.coordinates : [];
      const firstRoutePt = coords.length ? coords[0] : null;
      const lastRoutePt = coords.length ? coords[coords.length - 1] : null;
      const cameraCenter = { lng: map.getCenter().lng, lat: map.getCenter().lat };
      return JSON.stringify({ mCoords, colCoords, lastRoutePt, routeCount: coords.length, cameraCenter });
    })()`
  });
  console.log('RESULT:', result.result.value);

  await send('Page.close');
  ws.close();
  edge.kill();
}

check().catch(console.error);
