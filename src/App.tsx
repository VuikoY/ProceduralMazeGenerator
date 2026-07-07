import { useState } from "react";
import { Slider, Button, Box, Typography } from "@mui/material";
import { GenerateMaze, type MazeSettings } from "./MazeBlueprint";
import { GetMaze, type CellVisualisationData, type VisualisationData } from "./Visualisation";
import { Maze } from "./Visualisation";
import { GetBackground, type CellBackgroundData } from "./Visualisation";

function App() {
  const [failChance, setFailChance] = useState(80);
  const [xSize, setXSize] = useState(63);
  const [ySize, setYSize] = useState(15);
  const cellSize = 25;

  const [background, setBackground] = useState<CellBackgroundData[]>([]);
  const [walls, setWalls] = useState<CellVisualisationData[]>([]);


  function SpawnLabyrinth() {

    const settings: MazeSettings = {
      xSize: xSize,
      ySize: ySize,
      failChance: failChance / 100
    };


    const labyrinthBlueprint = GenerateMaze(
      settings,
      { x: 0, y: 0 },
      { x: xSize, y: ySize }
    );


    const visualisationData: VisualisationData = {
      blueprint: labyrinthBlueprint,
      xSize: xSize,
      ySize: ySize,
      cellSize: cellSize
    };


    const wallsData = GetMaze(visualisationData);
    const backgroundData = GetBackground(visualisationData);

    setWalls(wallsData);
    setBackground(backgroundData);
  }


  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "30px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 3,
          flexWrap: "wrap",
          width: "90%",
          marginBottom: 3,
        }}
      >

        <Box sx={{ width: 170 }}>
          <Typography>
            Difficulty: {failChance}
          </Typography>

          <Slider
            value={failChance}
            onChange={(_, value) =>
              setFailChance(value as number)
            }
            min={0}
            max={100}
          />
        </Box>


        <Box sx={{ width: 170 }}>
          <Typography>
            X Size: {xSize + 1}
          </Typography>

          <Slider
            value={xSize}
            onChange={(_, value) =>
              setXSize(value as number)
            }
            min={1}
            max={63}
          />
        </Box>


        <Box sx={{ width: 170 }}>
          <Typography>
            Y Size: {ySize + 1}
          </Typography>

          <Slider
            value={ySize}
            onChange={(_, value) =>
              setYSize(value as number)
            }
            min={1}
            max={15}
          />
        </Box>

      </Box>



      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 5,
        }}
      >

        <Button
          variant="contained"
          onClick={SpawnLabyrinth}
        >
          Spawn labyrinth
        </Button>

      </Box>



      <Box
        sx={{
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "auto",
        }}
      >

        <Maze
          walls={walls}
          background={background}
          width={xSize * cellSize}
          height={ySize * cellSize}
        />

      </Box>

    </Box>
  );
}


export default App;