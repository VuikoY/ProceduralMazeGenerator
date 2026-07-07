import { LocalWallPosition, parsePosition, type CellData } from "./MazeBlueprint";

export interface VisualisationData{
    blueprint: Map<string, Set<CellData>>;
    xSize: number;
    ySize: number;
    cellSize: number;
}
export interface CellBackgroundData {
    x: number;
    y: number;  
    size: number;
}
export interface CellVisualisationData {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
}
export interface MazeProps {
    walls: CellVisualisationData[];
    background: CellBackgroundData[];
    width: number;
    height: number;
}
export function GetMaze(data: VisualisationData): CellVisualisationData[] {
    let visualisationData: CellVisualisationData[] = [];

    data.blueprint.forEach((value, key) => {
        let cellBorders = GetCellBorders(value, data.cellSize, key);
        cellBorders.forEach(element => {
            visualisationData.push(element);
        });
    })
    return visualisationData;
}
export function GetBackground(data: VisualisationData): CellBackgroundData[]{
    let background: CellBackgroundData[] = [];

    data.blueprint.forEach((value, key) => {
        let cellBackgroundData = GetCellBackground(key, data.cellSize);
        background.push(cellBackgroundData);
    })

    return background;
}
export function MazeBackground(backgroundData: CellBackgroundData) {
    return (
        <rect
            x={backgroundData.x}
            y={backgroundData.y}
            width={backgroundData.size}
            height={backgroundData.size}
            fill="#eff8ff"
        />
    );
}
export function Maze({ walls, background, width, height }: MazeProps) {   
     return (
        <svg
            width={window.innerWidth}
            height={window.innerHeight / 2}
            viewBox={`0 0 ${window.innerWidth} ${window.innerHeight / 2}`}
        >

            <g
                transform={`translate(${(window.innerWidth - width) / 2}, ${(window.innerHeight / 2 - height) / 2})`}
            >
                {background.map((cell, index) => (
                    <MazeBackground
                        key={index}
                        {...cell}
                    />
                ))}
                {walls.map((wall, index) => (
                    <line
                        key={index}
                        x1={wall.x1}
                        y1={wall.y1}
                        x2={wall.x2}
                        y2={wall.y2}
                        stroke="black"
                        strokeWidth="2"
                    />
                ))}

            </g>

        </svg>
    );
}
function GetCellBackground(cellID: string, cellSize: number): CellBackgroundData {

    const position = parsePosition(cellID);

    return {
        x: position.x * cellSize,
        y: position.y * cellSize,
        size: cellSize
    };
}
function GetCellBorders(data: Set<CellData>, cellSize: number, cellID: string): CellVisualisationData[]{
    let cellVisualisationData: CellVisualisationData[] = [];
    let centralPos = parsePosition(cellID);

    centralPos.x = centralPos.x * cellSize + cellSize / 2;
    centralPos.y = centralPos.y * cellSize + cellSize / 2;

    let up = true;
    let right = true;
    let down = true;
    let left = true;

    data.forEach((value) => {
        if(value.emptySpace == LocalWallPosition.Up)
            up = false;
        else if(value.emptySpace == LocalWallPosition.Right)
            right = false;
        else if(value.emptySpace == LocalWallPosition.Down)
            down = false;
        else if(value.emptySpace == LocalWallPosition.Left)
            left = false;
    })

    if(up){
        let wall: CellVisualisationData = {
            x1: centralPos.x - cellSize / 2,
            x2: centralPos.x + cellSize / 2,
            y1: centralPos.y - cellSize / 2,
            y2: centralPos.y - cellSize / 2
        }
        cellVisualisationData.push(wall);
    }
    if(right){
        let wall: CellVisualisationData = {
            x1: centralPos.x + cellSize / 2,
            x2: centralPos.x + cellSize / 2,
            y1: centralPos.y - cellSize / 2,
            y2: centralPos.y + cellSize / 2
        }
        cellVisualisationData.push(wall);
    }
    if(down){
        let wall: CellVisualisationData = {
            x1: centralPos.x - cellSize / 2,
            x2: centralPos.x + cellSize / 2,
            y1: centralPos.y + cellSize / 2,
            y2: centralPos.y + cellSize / 2
        }
        cellVisualisationData.push(wall);
    }
    if(left){
        let wall: CellVisualisationData = {
            x1: centralPos.x - cellSize / 2,
            x2: centralPos.x - cellSize / 2,
            y1: centralPos.y + cellSize / 2,
            y2: centralPos.y - cellSize / 2
        }
        cellVisualisationData.push(wall);
    }
    return cellVisualisationData;
}