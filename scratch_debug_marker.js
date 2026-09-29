const { spawn } = require('child_process');
const http = require('http');

async function debugMarker() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const port = 9832;
  const userDataDir = 'C:\\Users\\Yepin\\AppData\\Local\\Temp\\edge-test-' + port;

  const edge = spawn(edgePath, [
    '--headless=new',
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

  const res = await send('Runtime.evaluate', {
    expression: `(() => {
      const s = STOPS['mashiramo'];
      currentSelectedStop = s;
      highlightMarker('mashiramo');
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
        bearing: 160
      });

      const m = document.getElementById('marker-mashiramo');
      const c = colibriEl;
      const mR = m.getBoundingClientRect();
      const cR = c.getBoundingClientRect();
      
      // Check if marker is behind another element
      const elemAtCenter = document.elementFromPoint(mR.left + mR.width/2, mR.top + mR.height/2);

      return {
        markerRect: { left: mR.left, top: mR.top, width: mR.width, height: mR.height },
        colibriRect: { left: cR.left, top: cR.top, width: cR.width, height: cR.height },
        markerStyle: m.getAttribute('style'),
        markerParent: m.parentElement.className,
        markerDisplay: window.getComputedStyle(m).display,
        markerVisibility: window.getComputedStyle(m).visibility,
        markerOpacity: window.getComputedStyle(m).opacity,
        elementOverMarker: elemAtCenter ? (elemAtCenter.id || elemAtCenter.className || elemAtCenter.tagName) : null,
        markerHtml: m.outerHTML
      };
    })()`,
    returnByValue: true
  });

  console.log(JSON.stringify(res.result.value, null, 2));

  await send('Page.close');
  ws.close();
  edge.kill();
}

debugMarker().catch(console.error);
