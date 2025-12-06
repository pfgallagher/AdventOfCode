import { readFile } from 'fs/promises';

const sum = (ns: number[]) => ns.reduce((a, c) => a + c, 0);

const product = (ns: number[]) => ns.reduce((a, c) => a * c, 1);

const getColumns = (grid: string[] | string[][]) => {
    const columns = [];
    const maxRowLength = Math.max(...grid.map((r) => r.length));
    for (let c = 0; c < maxRowLength; c++) {
        const column = [];
        for (let r = 0; r < grid.length; r++) {
            const val = grid[r][c];
            if (val) {
                column.push(grid[r][c]);
            }
        }
        columns.push(column);
    }
    return columns;
};

const calculate = (column: string[]) => {
    const operands = column.slice(0, -1).map((nStr) => Number.parseInt(nStr));
    const operation = column.slice(-1)[0] === '+' ? sum : product;
    return operation(operands);
}

const getCephalopodColumns = async () => {
    const columns = getColumns((await readFile('2025/06/day6.txt', 'utf-8')).split('\n'));
    const cephalopodColumns: string[][] = [[]];
    let isFirst = true;
    let operand = '';
    for (const col of columns) {
        if (isFirst) {
            operand = col.pop()!;
            isFirst = false;
        }
        if (col.every(val => val === ' ')) {
            isFirst = true;
            cephalopodColumns[cephalopodColumns.length - 1].push(operand);
            cephalopodColumns.push([]);
            continue;
        }
        cephalopodColumns[cephalopodColumns.length - 1].push(col.join('').trim());
    }
    cephalopodColumns[cephalopodColumns.length - 1].push(operand);
    return cephalopodColumns;
}

(async () => {
    const grid = (await readFile('2025/06/day6.txt', 'utf-8')).split('\n').map((r) => r.trim().split(/\s+/));
    const columns = getColumns(grid)
    const cephalopodColumns = await getCephalopodColumns();
    console.log(sum(columns.map((column) => calculate(column)))); // 4771265398012
    console.log(sum(cephalopodColumns.map((column) => calculate(column)))); // 10695785245101
})();