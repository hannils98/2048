/**
 * Shifts the tiles on the game grid depending on which arrow key has been pressed. 
 * Also adds a new tile if the shift caused the board to be changed
 * @param grid - The current grid array.
 * @returns The updated grid array.
 */
export function shiftGrid(grid: string[], key: string): string[] {

    let newGrid: string[] = [];
    
    if ( key === 'ArrowLeft' || key === 'ArrowRight') {
        newGrid = handleRows(grid, key);
    } else {
        newGrid = handleColumns(grid, key);
    }

    // check so we only add tile if something has changed
    if (JSON.stringify(grid) !== JSON.stringify(newGrid)) {
        addTile(newGrid);
    }

    return newGrid;
}


function handleRows(grid: string[], key: string): string[] {
    const size = 4;

    // create rows from grid array
    const rows = [];
    for (let i = 0; i < grid.length; i += size) {
        const row = grid.slice(i, i + size);
        rows.push(row);
    }

    //  shift the empty tiles to the start/end of each row
    const updatedRows = shift(rows, key);

    // turn the updated rows back to grid array
    const newGrid: string[] = updatedRows.flat();

    return newGrid
}


function handleColumns(grid: string[], key: string): string[] {
    const size = 4;

    // create columns from grid array
    const columns = [];
    for (let i = 0; i < size; i++) {
        const column = grid.filter((_, tile) => (tile - i) % 4 === 0 && tile >= i);
        columns.push(column);
    }

    //  shift the empty tiles to the start/end of each column
    const updatedColumns = shift(columns, key);

    // turn the updated rows back to grid array
    const newGrid: string[] = [];
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            newGrid.push(updatedColumns[j][i]);
        }
    }

    return newGrid
}

function shift(grid: string[][], key: string): string[][] {
    const updatedGrid: string[][] = []
    
    for ( const row of grid ) {
        const shiftedRow = row.filter(tile => tile !== "");
        const newRow = mergeTiles(shiftedRow);

        while (newRow.length < 4) {
            if ( key === 'ArrowLeft' || key === 'ArrowUp' ){
                newRow.push("");
            } else{
                newRow.unshift("");
            }   
        }
        updatedGrid.push(newRow);

    }

    return updatedGrid;
}


function mergeTiles(row: string[]): string[] {
    const newRow: string[] = [];
    let newTile = "";
    let lastTile = "";

    for (const tile of row) {
        if (tile === lastTile && tile !== ""){
            newTile = String(Number(tile)*2);
            newRow.pop();
            lastTile = "";
        }else{
            newTile = tile;
            lastTile = tile;
        }
        newRow.push(newTile);
    }
    return newRow;
}


function addTile(newGrid:string[]): string[] {
    
    const emptyTiles = [];
    const tileValues = ["2", "4"];

    for (let i = 0; i < newGrid.length; i++) {
        if (newGrid[i] === "") {
            emptyTiles.push(i);
        }
    }

    const tilePlace = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    const tileValue = tileValues[Math.floor(Math.random() * tileValues.length)];

    newGrid.splice(Number(tilePlace), 1, tileValue);

    return newGrid;

}

/**
 * Creates a new grid that only contains two tiles. 
 * @returns The new grid array.
 */
export function resetGrid(): string[] {
    const newGrid = new Array(16).fill("")

    addTile(newGrid);
    addTile(newGrid);

    return newGrid
}
