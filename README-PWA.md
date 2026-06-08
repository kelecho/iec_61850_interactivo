# IEC 61850 Interactivo — Paquete PWA

Esta carpeta es una **PWA instalable** (Progressive Web App). A diferencia del archivo
único `IEC61850_Interactivo.html` (que funciona con doble clic), una PWA **debe servirse
por HTTPS** para instalarse y usar el service worker. Aquí van los pasos para publicarla en
**GitHub Pages**.

## Contenido
- `index.html` — la app (mismo contenido + capacidades PWA)
- `manifest.webmanifest` — nombre, iconos, colores, modo standalone
- `sw.js` — service worker (caché offline)
- `icons/` — icon-192, icon-512, icon-maskable-512, apple-touch-icon

## Publicar en GitHub Pages
1. Crea un repositorio en GitHub (p. ej. `iec61850-interactivo`).
2. Sube **el contenido de esta carpeta** a la raíz del repo (que queden en la raíz
   `index.html`, `manifest.webmanifest`, `sw.js` y la carpeta `icons/`).
   Por git:
       git init
       git add .
       git commit -m "IEC 61850 Interactivo (PWA)"
       git branch -M main
       git remote add origin https://github.com/USUARIO/iec61850-interactivo.git
       git push -u origin main
3. En el repo: Settings -> Pages. Source = "Deploy from a branch", Branch = main / (root). Guardar.
4. Espera ~1 min. URL: https://USUARIO.github.io/iec61850-interactivo/
5. Ábrela en el móvil o en Chrome/Edge de escritorio.

## Instalar
- Android (Chrome): menú -> "Instalar aplicación".
- iOS (Safari): Compartir -> "Agregar a pantalla de inicio".
- Escritorio (Chrome/Edge): icono de instalar en la barra de direcciones.

Tras instalarse abre en su propia ventana, con icono propio, y funciona sin conexión.

## Notas
- Rutas relativas: funciona en https://USUARIO.github.io/repo/ sin reconfigurar.
- Al actualizar: sube el nuevo index.html y cambia la versión del caché en sw.js
  (var CACHE='iec61850-v1' -> 'v2') para forzar la actualización en los usuarios.
- El archivo único IEC61850_Interactivo.html sigue disponible para uso offline por doble clic.
