
export function shiftGrid(grid: string[], key: string): string[] {

    let newGrid: string[] = [];
    
    if ( key === 'ArrowLeft' || key === 'ArrowRight') {
        newGrid = handleRows(grid, key);
    } else {
        newGrid = handleColumns(grid, key);
    }

    if (JSON.stringify(grid) !== JSON.stringify(newGrid)) {
        newGrid = addTile(newGrid);
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
    const newGrid = updatedRows.flat();

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

function shift(arrays: string[][], key: string): string[][] {
    const updatedArrays = []
    
    for ( const a of arrays ) {
        const updatedArray = a.filter(tile => tile !== "");

        while (updatedArray.length < 4) {
            if ( key === 'ArrowLeft' || key === 'ArrowUp' ){
                updatedArray.push("");
            } else{
                updatedArray.unshift("");
            }   
        }
        updatedArrays.push(updatedArray);

    }

    return updatedArrays;
}


function addTile(newGrid:string[]): string[] {
    
    const emptyTiles = [];
    const tileValues = ["2", "4"];

    for (const i in newGrid) {
        if (newGrid[i] === "") {
            emptyTiles.push(i);
        }
    }

    const tilePlace = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    const tileValue = tileValues[Math.floor(Math.random() * tileValues.length)];

    newGrid.splice(parseInt(tilePlace), 1, tileValue);

    return newGrid;

}


export function resetGrid() {
    let newGrid = Array(16).fill("")

    newGrid = addTile(newGrid);
    newGrid = addTile(newGrid);

    return newGrid
}