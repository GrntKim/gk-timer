export function createSolve({ eventId, timeMs, penalty, scramble }) {
    return {
        id: crypto.randomUUID(),
        eventId,
        timeMs,
        penalty,
        scramble,
        createdAt: Date.now(),
    };
}