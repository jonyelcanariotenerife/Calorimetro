# Calorímetro 🎙️

Voz → IA → macros. Construido con el mismo sistema visual que Quantum Finance: React+Tailwind por CDN, modo oscuro/claro, modales bottom-sheet, huella del creador.

## Publicar en GitHub Pages

1. Sube esta carpeta a un repo.
2. **Settings → Pages → Source: Deploy from branch → main / (root)**.
3. Te da una URL tipo `https://tuusuario.github.io/calorimetro/`.

## Instalar en el móvil (Android)

1. Abre la URL en Chrome.
2. Menú (⋮) → **Añadir a pantalla de inicio**.
3. Queda instalada como app nativa.

## Configurar

1. Botón ⚙️ arriba a la derecha → pega tu API Key de Gemini (solo en este móvil, `localStorage`).
2. Toca el micrófono grande y describe qué comiste. Se abre un formulario pre-rellenado por IA — revisa y pulsa GUARDAR.
3. También puedes tocar "Añadir manual" para escribir/dictar solo el nombre y luego "Analizar con IA".

## Qué cambió respecto a la versión anterior

- Reconstruida sobre tu stack de Quantum Finance: React 18 + Babel standalone + Tailwind CDN + Font Awesome + Plus Jakarta Sans, en vez de vanilla JS.
- Mismo sistema de tema oscuro/claro (toggle ☀️/🌙), misma paleta semántica (índigo = acción, esmeralda = proteína/positivo, ámbar = carbos, rosa = grasa/aviso).
- Flujo de voz mejorado: ahora abre un modal de confirmación con los valores de la IA ya rellenos, para que puedas corregirlos antes de guardar (antes se guardaba directo).
- Nueva opción de **entrada manual** con el mismo modal, reutilizable también para **editar** registros ya guardados (lápiz) y borrarlos (papelera).
- **Huella del creador**: botón de huella dactilar abajo → modal "El Hilván" con tu crédito. Cambia el nombre/texto en `index.html` si quieres otro.
- **Guía de Usuario**: botón flotante (interrogación) con pestañas "Voz" e "Historial".
- Aviso de sin conexión (`isOnline`) que desactiva el micrófono cuando no hay internet, igual que en Quantum Finance.

## Notas técnicas

- Voz = Web Speech API nativa → Chrome Android (no iOS Safari).
- Historial 100% local (`localStorage`), sin backend. Si más adelante quieres sync con el PC, aplica el mismo patrón Syncthing P2P que usas en tus apps de finanzas — dímelo y lo monto.
- El Service Worker cachea solo tu propio shell; los CDNs los cachea el navegador tras la primera carga (necesitas internet la primera vez que abras la app).
