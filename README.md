# Cubicador de tabiquería steel frame · Interhaus

Aplicación web instalable (PWA) para cubicar tabiquería steel frame: montantes,
canales, traslapos escalonados y planchas de yeso-cartón, con lista de
materiales unificada y exportación a CSV y Excel.

Desarrollada por **Patricio Farías** — Obras Civiles, Interhaus.

## Usarla

Abrir la dirección de GitHub Pages del repositorio. Funciona en el navegador
sin instalar nada.

## Instalarla como app

- **Computador (Chrome / Edge):** botón **Instalar app** en la barra superior,
  o el ícono de instalación en la barra de direcciones.
- **Android (Chrome):** menú ⋮ → *Instalar aplicación*.
- **iPhone / iPad (Safari):** Compartir → *Agregar a pantalla de inicio*.

Una vez instalada **funciona sin conexión**: queda guardada en el equipo, con la
tipografía y los íconos incluidos. Útil en obra, donde no siempre hay señal. El
indicador de la barra superior avisa cuando no hay red.

## Qué calcula

- **Estructura:** montantes cada *x* mm sobre el largo libre más el de cierre,
  canal superior e inferior, y las barras necesarias para los traslapos.
- **Traslapos escalonados:** se alternan montante a montante — el primero con la
  tira de remate arriba, el siguiente con la tira abajo. El despiece de barras
  es el mismo en ambas variantes; el escalonado es de montaje.
- **Planchas por despiece real:** columnas de 1,20 m × filas de 2,40 m, con
  aprovechamiento de recortes (tope de 4 piezas por plancha). Se muestran el
  mínimo teórico por área y la merma, para poder compararlos.
- **Aprovechamiento del acero:** metros comprados contra metros instalados, con
  el uso de cada familia de barra por separado.
- **Elevación paramétrica:** dibujo del muro con vistas de estructura y de
  despiece de planchas, que se redibuja con cada cambio.

## Supuestos

| Elemento | Valor |
|---|---|
| Perfil C (montante) | 60 × 38 × 0,85 — barra de 2400 mm |
| Canal U | 62 × 25 × 0,85 — barra de 3000 mm |
| Traslapo | 600 mm, centrado (300 + 300) |
| Holgura losa a losa | 2 mm |
| Plancha yeso-cartón | 1,20 × 2,40 m, 15 mm |

- Si la tira de remate queda bajo 300 mm, el traslapo no entra centrado y la app
  marca el muro como **no ejecutable**.
- El descuento por vanos se aplica solo al m² teórico, no al despiece físico
  (criterio conservador de pedido).
- Los **accesorios** (tornillos, fijaciones, masilla, cinta) salen de
  rendimientos editables en el punto 01. Validarlos contra el estándar de obra
  antes de pedir a bodega.

## Datos

El resumen de muros se guarda en el navegador de cada equipo (`localStorage`).
**No se sincroniza** entre el celular y el computador, ni entre personas. Para
compartir cubicaciones hay que exportar a CSV o Excel.

## Estructura del repositorio

```
index.html              la app completa: un archivo, sin dependencias externas
manifest.webmanifest    nombre, colores e íconos de la app instalable
sw.js                   service worker — funcionamiento sin conexión
assets/                 íconos de la marca y tipografía DM Sans
.nojekyll               evita que GitHub Pages procese el sitio
```

## Mantención

El paquete se genera con `build.py` (fuera del repositorio) a partir del
`index.html` de la app. Al publicar cambios:

1. Subir `APP_VERSION` en `index.html`. El nombre del caché en `sw.js` se deriva
   de ahí, así que los equipos que ya tienen la app instalada reciben la nueva
   versión. **Si no se sube, siguen viendo la anterior.**
2. Para cambiar el logo o los íconos, reemplazar los PNG de `assets/`
   manteniendo nombres y tamaños.

La app imprime en claro aunque la pantalla sea oscura, con el logo en su versión
original sobre blanco.
