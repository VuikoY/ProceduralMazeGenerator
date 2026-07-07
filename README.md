# Procedural Maze Generator with SVG Rendering

A lightweight, high-performance interactive web application that handles procedural maze generation. This project demonstrates how gamedev-inspired algorithmic thinking (data-driven design and strict blueprint decoupling) can be seamlessly integrated into modern web tech stack like **React**, **TypeScript**, and **Vector Graphics (SVG)**.

🚀 **[Live Demo Link]** *(<- Replace this with the actual Vercel / GitHub Pages link after deployment)*

---

## 🛠️ Tech Stack & Architecture

* **Framework:** React 18+ (Functional Components & Hooks)
* **Language:** TypeScript (Strict typing for all structures and contexts)
* **UI Components:** Material UI (MUI) for responsive controls
* **Rendering Layer:** Scalable Vector Graphics (SVG) with raw geometric `<line>` components (Zero heavy canvas or overhead `<div>` elements)

### The Architectural Core
The application follows a strict **Data-Driven Architecture** separated into three isolation layers:
1. **The Blueprint Layer (`MazeBlueprint`):** Pure abstract data structures. The generation logic knows absolutely nothing about pixels, web browsers, or rendering. It merely builds a mathematical map (`Map<string, Set<CellData>>`) based on configuration rules.
2. **The Visualisation Adapter (`Visualisation.tsx`):** A conversion layer that parses abstract spatial cell coordinates, scales them by cellular configurations, and maps out actual 2D geometric vector points ($x_1, y_1, x_2, y_2$).
3. **The View Component (`Maze`):** A declarative UI component that receives the computed array of vector walls and instantly draws them onto an optimized `<svg>` view canvas using native hardware-accelerated browser line vectors.

---

## ⚡ Key Features & Engineering Highlights

* **Procedural Context Control:** Real-time generation variables such as grid size ($X \times Y$), visual cell scale, and a difficulty metric defined by custom structural fail chances.
* **SVG Optimization over DOM Canvas:** By avoiding thousands of styled HTML `div` blocks, the app guarantees exceptional performance and layout responsiveness. The vector map scales dynamically to any screen resolution without blurring.
* **Game Development Blueprint Pattern:** Reuses reliable procedural gamedev patterns inside a stateless web ecosystem, showcasing how logical data state determines view presentation instead of keeping state in visual objects.

---

## 📂 Project Structure Overview

```text
src/
├── App.tsx             # App Entry, Layout Configuration, and State Orchestration
├── main.tsx            # React Virtual DOM Mounting Point
├── MazeBlueprint.ts    # [Abstract Data Layer] Mathematical generation structures
└── Visualisation.tsx   # [Presentation Layer] Vectors mapping and the SVG View Component