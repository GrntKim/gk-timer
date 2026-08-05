export function getSolveResultMs(solve) {
    if (solve.penalty === 'DNF') return null;
    return solve.timeMs + (solve.penalty === '+2' ? 2000 : 0);
}

export function calculateMeanOfN(windowSolves) {
    const results = windowSolves.map(getSolveResultMs);
    const dnfCount = results.filter((result) => result === null).length;

    if (dnfCount >= 2) return null;

    const sorted = [...results].sort((a, b) => {
        if (a === null) return 1;
        if (b === null) return -1;
        return a - b;
    });

    const trimmed = sorted.slice(1, sorted.length - 1);
    const sum = trimmed.reduce((total, ms) => total + ms, 0);

    return sum / trimmed.length;
}

export function getCurrentAverage(solves, n) {
    if (solves.length < n) return undefined;
    return calculateMeanOfN(solves.slice(0, n));
}

export function getBestAverage(solves, n) {
    if (solves.length < n) return undefined;

    let best = null;
    for (let i = 0; i <= solves.length - n; i++) {
        const result = calculateMeanOfN(solves.slice(i, i + n));
        if (result !== null && (best === null || result < best)) {
            best = result;
        }
    }

    return best;
}

export function getBestSingle(solves) {
    const results = solves.map(getSolveResultMs).filter((result) => result !== null);
    if (results.length === 0) return undefined;
    return Math.min(...results);
}
