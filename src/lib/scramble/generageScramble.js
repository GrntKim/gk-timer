import { randomScrambleForEvent } from "cubing/scramble";


export async function generateScramble(event = '333') {
    const alg = await randomScrambleForEvent(event);

    return {
        eventName: event.toString(),
        scrambleText: alg.toString(),
        generatedAt: Date.now(),
    }
}