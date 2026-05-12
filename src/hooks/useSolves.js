import { useEffect, useState } from "react";
import { createSolve } from "../lib/solves/createSolve";

const STORAGE_KEY = 'gk-timer::solves';

export function useSolves() {
    const [solves, setSolves] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        try {
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(solves));
    }, [solves]);

    function addSolve({ eventId, timeMs, penalty, scramble }) {
        const solve = createSolve({
            eventId,
            timeMs,
            penalty,
            scramble,
        });

        setSolves((prevSolves) => [solve, ...prevSolves]);

        return solve;
    }

    function resetSolves() {
        setSolves([]);
    }

    return {
        solves,
        addSolve,
        resetSolves,
    };
}