import { readFile } from 'fs/promises';

const normalizeFreshRanges = (freshRanges: string[]) =>
    freshRanges.map((freshRange) => freshRange.split('-').map((nStr) => Number.parseInt(nStr, 10)));

const countAvailableFresh = (freshRanges: string[], availableIngredients: string[]) => {
    const normalizedFreshRanges = normalizeFreshRanges(freshRanges);
    const normalizedAvailableIngredients = availableIngredients.map((nStr) => Number.parseInt(nStr, 10));
    return normalizedAvailableIngredients.reduce((count, ingredient) => {
        for (const [start, end] of normalizedFreshRanges) {
            if (ingredient >= start && ingredient <= end) {
                return count + 1;
            }
        }
        return count;
    }, 0)
};

const countConsideredFresh = (freshRanges: string[]) => {
    const normalizedFreshRanges = normalizeFreshRanges(freshRanges).sort(([a], [b]) => a - b);
    const { curStart, curEnd, total } = normalizedFreshRanges.slice(1).reduce((acc, [start, end]) => {
        const { curStart, curEnd, total } = acc;
        return start <= curEnd + 1 ? {
            ...acc,
            curEnd: Math.max(curEnd, end),
        } : {
            curStart: start,
            curEnd: end,
            total: total + (curEnd - curStart + 1),
        }
    }, {
        curStart: normalizedFreshRanges[0][0],
        curEnd: normalizedFreshRanges[0][1],
        total: 0,
    });
    return total + (curEnd - curStart + 1);
}


(async () => {
    const [freshRanges, availableIngredients] = (await readFile('2025/05/day5.txt', 'utf-8')).split('\n\n').map((list) => list.split('\n'));
    const availableFreshCount = countAvailableFresh(freshRanges, availableIngredients);
    const consideredFreshCount = countConsideredFresh(freshRanges);
    console.log(availableFreshCount); // 617
    console.log(consideredFreshCount); // 338258295736104
})();