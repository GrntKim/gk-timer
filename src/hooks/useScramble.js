import { useEffect, useState } from "react";
import { generateScramble } from "../lib/scramble/generageScramble";

export function useScramble(initialEvent = '333') {
    const [scramble, setScramble] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    async function nextScramble(eventId = initialEvent) {
        setIsLoading(true);

        const next = await generateScramble(eventId);

        setScramble(next);
        setIsLoading(false);
    }

    useEffect(() => {
        let ignore = false;

        async function loadInitialScramble() {
            const initialScramble = await generateScramble(initialEvent);
            if (!ignore) {
                setScramble(initialScramble);
                setIsLoading(false);
            }
        }

        loadInitialScramble();

        return () => {
            ignore = true;
        };
    }, [initialEvent]);

    return {
        scramble,
        isLoading,
        nextScramble,
    }
}
