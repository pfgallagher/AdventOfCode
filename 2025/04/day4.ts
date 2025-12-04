import { readFile } from 'fs/promises';

type Grid = string[][];

const checkNeighbors = (grid: Grid, r: number, c: number, shouldRemove: boolean) => {
    if (grid[r][c] !== '@') {
        return false;
    }
    let count = 0;
    for (let i = r - 1; i <= r + 1; i++ ) {
        for (let j = c - 1; j <= c + 1; j++) {
            if (i === r && j === c) {
                continue;
            }
            const val = grid?.[i]?.[j];
            if (val === '@') {
                count++;
            }
            if (count === 4) {
                return false;
            }
        }
    }
    if (shouldRemove) {
        grid[r][c] = '.'; 
    }
    return true;
}


(async () => {
    const grid = (await readFile('2025/04/day4.txt', 'utf-8')).split('\n').map((r) => r.split(''));
    let p1Count = 0;
    for (let i = 0; i < grid.length; i++) {
        const row = grid[i];
        for (let j = 0; j < row.length; j++) {
            if (checkNeighbors(grid, i, j, false)) {
                p1Count++;
            }
        }
    }
    let p2Count = 0;
    while (true) {
        let removedCount = 0;
        for (let i = 0; i < grid.length; i++) {
            const row = grid[i];
            for (let j = 0; j < row.length; j++) {
                if (checkNeighbors(grid, i, j, true)) {
                    removedCount++;
                }
            }
        }
        if (removedCount) {
            p2Count += removedCount;
        } else {
            break;
        }
    }
    console.log(p1Count); // 1393
    console.log(p2Count); // 8643
})();