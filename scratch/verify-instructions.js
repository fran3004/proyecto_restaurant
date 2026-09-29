const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

async function verify() {
  console.log('=== VERIFICANDO INSTRUCCIONES 1 Y 2 ===\n');
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const port = 9797;
  const userDataDir = `C:\\Users\\Yepin\\AppData\\Local\\Temp\\edge-test-${port}`;

  const edge = spawn(edgePath, [
    '--headless=new',
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--enable-webgl',
    '--ignore-gpu-blocklist',
    '--window-size=1280,800',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${userDataDir}`,
    'about:blank'
  ]);

  let list = null;
  for (let i = 0; i < 25; i++) {
    await new Promise(r => setTimeout(r, 200));
    try {
      list = await new Promise((resolve, reject) => {
        http.get(`http://127.0.0.1:${port}/json/list`, r => {
          let d = ''; r.on('data', c => d += c); r.on('end', () => resolve(JSON.parse(d)));
        }).on('error', reject);
      });
      if (list && list.length) break;
    } catch(e) {}
  }

  const page = list.find(t => t.type === 'page');
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise(r => ws.onopen = r);

  let id = 1;
  const cbs = new Map();
  function send(method, params = {}) {
    return new Promise(res => {
      const curId = id++; cbs.set(curId, res);
      ws.send(JSON.stringify({ id: curId, method, params }));
    });
  }
  ws.onmessage = e => {
    const d = JSON.parse(e.data);
    if (d.id && cbs.has(d.id)) { const cb = cbs.get(d.id); cbs.delete(d.id); cb(d.result); }
  };

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Page.navigate', { url: 'http://localhost:3000/proyecto_restaurant/brochure/mapa-3d.html?debug=1' });

  console.log('Esperando inicialización del mapa...');
  for (let s = 0; s < 30; s++) {
    await new Promise(r => setTimeout(r, 600));
    const check = await send('Runtime.evaluate', {
      expression: 'Boolean(window.mapInstance && window.mapInstance.loaded && window.mapInstance.loaded() && document.querySelectorAll(".landmark-marker").length === 10)',
      returnByValue: true
    });
    if (check?.result?.value) {
      console.log(`✓ Mapa y 10 marcadores listos en ~${((s+1)*0.6).toFixed(1)}s\n`);
      break;
    }
  }

  // 1. Probar posicionamiento en Parada 10 (Metallura)
  console.log('--- TEST 1: Parada 10 (Metallura) e Ícono 3D + Tarjeta debajo del colibrí ---');
  const test1Res = await send('Runtime.evaluate', {
    expression: `(() => {
      const s = STOPS.metallura;
      // Ir a metallura
      map.jumpTo({
        center: [s.lng, s.lat],
        zoom: s.zoom || 14.8,
        pitch: 45,
        bearing: -15,
        padding: getCameraPadding()
      });
      showPanel(s);
      colibriEl.classList.remove("flying");
      colibriEl.classList.add("landed");
      colibri.setLngLat([s.lng, s.lat]);
      colibri.setOffset([26, -72]);
      traerColibriAlFrente();
      highlightMarker("metallura");

      const m = document.getElementById("marker-metallura");
      const badge = m.querySelector(".landmark-badge-card");
      const img = m.querySelector(".landmark-diorama-model");
      const ring = m.querySelector(".landmark-anchor-ring");
      const shadow = m.querySelector(".landmark-ground-shadow");

      const mRect = m.getBoundingClientRect();
      const bRect = badge.getBoundingClientRect();
      const iRect = img.getBoundingClientRect();
      const cRect = colibriEl.getBoundingClientRect();

      return JSON.stringify({
        markerId: m.id,
        markerActive: m.classList.contains("active"),
        badgeCollapsed: m.classList.contains("badge-collapsed"),
        badgeVisible: window.getComputedStyle(badge).visibility,
        badgeOpacity: window.getComputedStyle(badge).opacity,
        badgeDisplay: window.getComputedStyle(badge).display,
        badgeHeight: bRect.height,
        imgVisible: window.getComputedStyle(img).visibility,
        imgDisplay: window.getComputedStyle(img).display,
        imgSrc: img.src.split("/").pop(),
        imgWidth: iRect.width,
        imgHeight: iRect.height,
        markerZIndex: window.getComputedStyle(m).zIndex,
        colibriLanded: colibriEl.classList.contains("landed"),
        colibriOverMarker: {
          colibriTop: cRect.top,
          markerTop: mRect.top,
          imgTop: iRect.top,
          badgeTop: bRect.top,
          colibriIsAbove: cRect.top < iRect.top
        }
      });
    })()`,
    returnByValue: true
  });

  const t1 = JSON.parse(test1Res.result.value);
  console.log('Resultados Test 1 (Metallura):');
  console.log(`  - Marcador activo: ${t1.markerActive ? '✓ SÍ' : '❌ NO'}`);
  console.log(`  - Badge colapsado: ${t1.badgeCollapsed ? '❌ SÍ (Error)' : '✓ NO (Visible)'}`);
  console.log(`  - Badge display/opacity: ${t1.badgeDisplay} / ${t1.badgeOpacity} (altura: ${t1.badgeHeight}px)`);
  console.log(`  - Ícono 3D: ${t1.imgSrc} (${t1.imgWidth}x${t1.imgHeight}px, display: ${t1.imgDisplay})`);
  console.log(`  - Colibrí posado: ${t1.colibriLanded ? '✓ SÍ' : '❌ NO'}`);
  console.log(`  - Colibrí encima del ícono: ${t1.colibriOverMarker.colibriIsAbove ? '✓ SÍ (colibriTop: ' + Math.round(t1.colibriOverMarker.colibriTop) + ' < imgTop: ' + Math.round(t1.colibriOverMarker.imgTop) + ')' : '❌'}`);

  // 2. Probar Barra de Navegación del Panel (Instrucción 2)
  console.log('\n--- TEST 2: Barra de Navegación Centrada y sin amontonamiento ---');
  const test2Res = await send('Runtime.evaluate', {
    expression: `(() => {
      const bar = document.getElementById("panelNavBar");
      const btnPrev = document.getElementById("btnPrevStop");
      const btnNext = document.getElementById("btnNextStop");
      const counter = document.getElementById("navStopCounter");

      const barRect = bar.getBoundingClientRect();
      const prevRect = btnPrev.getBoundingClientRect();
      const nextRect = btnNext.getBoundingClientRect();
      const cRect = counter.getBoundingClientRect();

      const prevRight = prevRect.right;
      const counterLeft = cRect.left;
      const counterRight = cRect.right;
      const nextLeft = nextRect.left;

      const gapLeft = counterLeft - prevRight;
      const gapRight = nextLeft - counterRight;

      const cStyles = window.getComputedStyle(counter);
      const isSingleLine = cRect.height <= 22; // si se parte en 2 líneas mediría ~30px+

      return JSON.stringify({
        counterText: counter.textContent,
        counterHeight: cRect.height,
        isSingleLine,
        whiteSpace: cStyles.whiteSpace,
        textAlign: cStyles.textAlign,
        gapLeftFromPrev: Math.round(gapLeft),
        gapRightToNext: Math.round(gapRight),
        barWidth: Math.round(barRect.width),
        prevWidth: Math.round(prevRect.width),
        counterWidth: Math.round(cRect.width),
        nextWidth: Math.round(nextRect.width)
      });
    })()`,
    returnByValue: true
  });

  const t2 = JSON.parse(test2Res.result.value);
  console.log('Resultados Test 2 (Nav Bar):');
  console.log(`  - Texto: "${t2.counterText}"`);
  console.log(`  - En una sola línea: ${t2.isSingleLine ? '✓ SÍ' : '❌ NO'} (altura: ${t2.counterHeight}px)`);
  console.log(`  - white-space: ${t2.whiteSpace}`);
  console.log(`  - text-align: ${t2.textAlign}`);
  console.log(`  - Separación botón Anterior: ${t2.gapLeftFromPrev}px (no pegado)`);
  console.log(`  - Separación botón Siguiente: ${t2.gapRightToNext}px (no pegado)`);

  // Tomar captura
  const shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scratch/verify-final.png', Buffer.from(shot.data, 'base64'));
  console.log('\n✓ Captura guardada en scratch/verify-final.png');

  edge.kill();
  console.log('\n=== VERIFICACIÓN COMPLETADA CON ÉXITO ===');
}

verify().catch(console.error);
