# 🌬️ Wind Turbine Simulator 3D

A small, playful **3D wind‑turbine simulator** that runs entirely in the browser. Crank up the wind, watch the blades spin, charge a virtual battery, and flip the electricity on and off — all rendered in real time with [Three.js](https://threejs.org/).

Built for fun and for learning the ins and outs of 3D graphics on the web.

**▶️ Live demo:** http://markshulhin.github.io/

---

## ✨ Features

| Feature | Description |
| --- | --- |
| 🌪️ **Adjustable wind speed** | Drag the *Modify wind speed* slider (0–25 km/h) and watch the turbine react in real time. |
| 🔋 **Battery charging** | The turbine converts wind into energy, filling up a 1 MW battery with a live loader animation. |
| ⚡ **Electricity On/Off** | Toggle the load to start draining the battery and burning through your stored energy. |
| 🧭 **Wind direction** | Eight selectable directions — energy is only generated from **North, North‑East and North‑West** (the turbine can't yaw… yet). |
| 🛑 **STOP ALL** | Emergency kill‑switch that halts the rotor and cuts the power the moment you sense danger. |
| ♻️ **Reset energy** | Empty the battery and start the challenge over. |
| 🌲 **Living scene** | Low‑poly trees, drifting foliage particles, soft shadows and exponential fog for atmosphere. |
| 🖱️ **Orbit camera** | Press and drag to fly around the turbine from any angle. |

> ⚙️ The turbine only produces power within a realistic wind range of **3–23 km/h** — too calm or too stormy and it sits idle.

---

## 🎮 How to play

1. Open the [live demo](http://markshulhin.github.io/) (or run it locally — see below).
2. Increase the **wind speed** and pick a productive **wind direction** (North works best).
3. Let the battery charge, then flip **Electricity On/Off** to spend the energy.
4. Hit **STOP ALL** if things get out of hand — and **Reset energy** to try again.
5. Drag anywhere to orbit the camera. Have fun ☺

---

## 🛠️ Tech stack

- **[Three.js](https://threejs.org/)** `r73` — WebGL rendering, lighting, shadows and fog
- **[GSAP / TweenMax](https://greensock.com/gsap/)** — smooth blade and particle animation
- **[dat.GUI](https://github.com/dataarts/dat.gui)** — the on‑screen control panel
- **[stats.js](https://github.com/mrdoob/stats.js)** — performance monitor
- **[OrbitControls](https://threejs.org/docs/#examples/en/controls/OrbitControls)** — mouse camera control
- **[Gulp](https://gulpjs.com/)** — concatenates & minifies scripts, CSS and images into `build/`

All the simulation logic lives in [`src/js/main.js`](src/js/main.js).

---

## 🚀 Running locally

No build step is required to just play — the scripts are already bundled into `build/`.

```bash
# clone the repo
git clone https://github.com/MarkShulhin/Wind-turbine-simulator3D.git
cd Wind-turbine-simulator3D

# serve the build folder with any static server, e.g.
npx serve build
# then open the printed URL in your browser
```

### Rebuilding assets

The project uses Gulp to bundle `src/` into `build/`:

```bash
npm install
npx gulp build
```

---

## 📁 Project structure

```
src/
├── index.html          # entry point
├── js/
│   ├── main.js         # all simulator logic
│   ├── three.js        # Three.js r73
│   ├── OrbitControls.js, TweenMax.min.js, dat.gui.min.js, stats.min.js …
│   ├── CustomMeshFlat.js, GeometryHelpers.js, Math2.js, scene_colors.js
│   └── all.min.js      # concatenated bundle
├── css/                # styles + loader animation
├── img/                # textures & favicon
└── obj/                # 3D turbine model (Blender + JSON)
build/                  # production-ready output
```

---

## 👤 Author

Created by **[Mark Shulhin](https://github.com/MarkShulhin)** for educational purposes and to have some fun with 3D in the browser.

## 📄 License

ISC
