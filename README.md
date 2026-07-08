Procedural Maze Generator

An interactive web application that generates procedural mazes and renders them using SVG. The project focuses on clean separation between generation logic and rendering, demonstrating how an algorithmic data model can drive a modern React application.

Demo

Live Demo:
https://vuikoy.github.io/ProceduralMazeGenerator/
Source Code:
https://github.com/VuikoY/ProceduralMazeGenerator

Features
Procedural maze generation
Adjustable maze dimensions
Configurable generation difficulty
SVG-based rendering
Interactive controls built with Material UI
Strong separation between generation logic and presentation
Tech Stack
React
TypeScript
Material UI
SVG
Architecture

The project is divided into three independent layers.

1. Maze Generation (MazeBlueprint.ts)

Contains the procedural generation algorithm.

The generator produces an abstract maze representation using:

Map<string, Set<CellData>>

This layer contains no rendering logic and has no dependency on React or SVG.

2. Visualization (Visualisation.ts)

Converts the abstract maze representation into drawable geometry.

Each cell is transformed into SVG line coordinates:

(x1, y1) -> (x2, y2)

The visualization layer is responsible only for mapping data into graphical primitives.

3. React View (Maze)

Receives prepared geometry and renders the maze using native SVG elements.

The React component does not generate the maze itself. It simply displays the data produced by the previous layers.

Project Structure
src/
├── App.tsx              # Application entry point
├── main.tsx             # React bootstrap
├── MazeBlueprint.ts     # Maze generation logic
└── Visualisation.tsx    # SVG conversion and rendering
How It Works
The user selects maze parameters.
The generator creates an abstract maze blueprint.
The visualization layer converts the blueprint into SVG line coordinates.
React renders the generated geometry.

This separation allows the generation algorithm to remain completely independent from the rendering implementation.

Running Locally
git clone https://github.com/VuikoY/ProceduralMazeGenerator.git

cd ProceduralMazeGenerator

npm install

npm run dev

Possible Improvements
Export generated mazes as SVG or PNG
Multiple generation algorithms
Pathfinding visualization
Maze solving animation
Adjustable wall thickness and colors
Animated generation process
