    export interface MazeSettings {
        xSize: number;
        ySize: number;
        failChance: number;
    }
    export interface CellData {
        emptySpace: LocalWallPosition;
    }
    export enum LocalWallPosition {
        Up,
        Right,
        Down,
        Left
    }
    export interface Vector2 {
        x: number;
        y: number;
    }
    export function GenerateMaze(settings: MazeSettings, startPosition: Vector2, endPosition: Vector2): Map<string, Set<CellData>> {
        let blueprint: Map<string, Set<CellData>> = new Map<string, Set<CellData>>();
        
        let isFinished = false;
        let safety = 0;
        
        let currentPosition: Vector2 = {
            x: startPosition.x,
            y: startPosition.y
        }
        let bufferedPositions: Vector2[] = [];
        let visitedPositions: Set<string> = new Set<string>();

        let allDirections: Vector2[] = [
            { x: 0, y: 1 },
            {x: 1, y: 0 },
            {x: 0, y: -1 },
            {x: -1, y: 0 }
        ];

        while(!isFinished &&  safety < 10000){
            let allowedDirections: Vector2[] = GetAllowedDirections(currentPosition, visitedPositions, settings.xSize, settings.ySize, allDirections);
            if(allowedDirections.length == 0){
                currentPosition = {
                    x: bufferedPositions[bufferedPositions.length - 1].x,
                    y: bufferedPositions[bufferedPositions.length - 1].y
                };

                bufferedPositions.pop();
                continue;
            }
            let direction: Vector2 = GetDirection(settings.failChance, currentPosition, endPosition, allowedDirections);
            let cellData: CellData = GetCellData(direction);

            bufferedPositions.push({
                x: currentPosition.x,
                y: currentPosition.y
            });
            if(blueprint.has(ConvertToString(currentPosition.x, currentPosition.y))){
                let cell = blueprint.get(ConvertToString(currentPosition.x, currentPosition.y))!;
                cell.add(cellData);
                blueprint.set(ConvertToString(currentPosition.x, currentPosition.y), cell);
            } else {
                let cell: Set<CellData> = new Set<CellData>();
                cell.add(cellData);
                blueprint.set(ConvertToString(currentPosition.x, currentPosition.y), cell);
            }
            currentPosition.x += direction.x;
            currentPosition.y += direction.y;

            visitedPositions.add(ConvertToString(currentPosition.x, currentPosition.y));
            safety++;
                if(blueprint.has(ConvertToString(currentPosition.x, currentPosition.y))){
                    let cell = blueprint.get(ConvertToString(currentPosition.x, currentPosition.y))!;
                    cell.add(GetOppositeCellData(cellData));
                    blueprint.set(ConvertToString(currentPosition.x, currentPosition.y), cell);
                }
                else {
                    let cell: Set<CellData> = new Set<CellData>();
                    cell.add(GetOppositeCellData(cellData));
                    blueprint.set(ConvertToString(currentPosition.x, currentPosition.y), cell);
                }
            if(ConvertToString(currentPosition.x, currentPosition.y) == ConvertToString(endPosition.x, endPosition.y)){
                isFinished = true;
            }
        }
        return blueprint;
    }
    function GetOppositeCellData(cellData: CellData): CellData{
        let cellData2: CellData = {
            emptySpace: LocalWallPosition.Down
        }

        switch(cellData.emptySpace){
            case LocalWallPosition.Down:
                cellData2.emptySpace = LocalWallPosition.Up;
            break;
            case LocalWallPosition.Up:
                cellData2.emptySpace = LocalWallPosition.Down;
            break;
            case LocalWallPosition.Right:
                cellData2.emptySpace = LocalWallPosition.Left;
            break;
            case LocalWallPosition.Left:
                cellData2.emptySpace = LocalWallPosition.Right;
        }

        return cellData2;
    }
    function GetCellData(direction:  Vector2): CellData {
        let cellData: CellData = {
            emptySpace: LocalWallPosition.Down
        }

        switch(direction.x){
            case -1:
                cellData.emptySpace = LocalWallPosition.Left;
                break;
            case 1:
                cellData.emptySpace = LocalWallPosition.Right;
                break;
        }
        switch(direction.y){
            case -1:
                cellData.emptySpace = LocalWallPosition.Up;
                break;
            case 1:
                cellData.emptySpace = LocalWallPosition.Down;
                break;
        }

        return cellData
    }
    
    function GetDirection(failChance: number, currentPosition: Vector2, endPosition: Vector2, allowedDirections: Vector2[]): Vector2{
        let goodDirection: Vector2[] = [];
        let badDirection: Vector2[] = [];

        allowedDirections.forEach(direction => {
            switch(direction.x){
                case -1:
                    if(currentPosition.x > endPosition.x)
                        goodDirection.push(direction);
                    else
                        badDirection.push(direction);
                    break;
                case 1:
                    if(currentPosition.x < endPosition.x)
                        goodDirection.push(direction);
                    else
                        badDirection.push(direction);
                    break;
            }
            switch(direction.y){
                case -1:
                    if(currentPosition.y > endPosition.y)
                        goodDirection.push(direction);
                    else
                        badDirection.push(direction);
                    break;
                case 1:
                    if(currentPosition.y < endPosition.y)
                        goodDirection.push(direction);
                    else
                        badDirection.push(direction);
                    break;           
            }
        });
        if(Math.random() > 1 - failChance && badDirection.length > 0)
            return badDirection[Math.floor(Math.random() * badDirection.length)];
        else if(goodDirection.length > 0)
            return goodDirection[Math.floor(Math.random() * goodDirection.length)];
        else
            return badDirection[Math.floor(Math.random() * badDirection.length)];
    }
    function GetAllowedDirections(
    currentPosition: Vector2, 
    visitedPositions: Set<string>,
    xSize: number, 
    ySize: number, 
    allDirections: Vector2[]): Vector2[]{
        
        let allowedDirections: Vector2[] = [];

        allDirections.forEach(direction => {
            let currentPosition2: Vector2 = {
                x: currentPosition.x + direction.x,
                y: currentPosition.y + direction.y
            }

            if(!visitedPositions.has(ConvertToString(currentPosition2.x, currentPosition2.y)) && 
            currentPosition2.x >= 0 && 
            currentPosition2.x <= xSize && 
            currentPosition2.y >= 0 &&
            currentPosition2.y <= ySize){
                allowedDirections.push(direction);
            }
        });

        return allowedDirections;
    }
    function ConvertToString(x: number, y: number): string {
        let currentPosition = "" + x + "," + y;
        return currentPosition;
    }
    export function parsePosition(key: string): Vector2 {
        const [x, y] = key.split(",").map(Number);

        return {
            x,
            y
        };
    }