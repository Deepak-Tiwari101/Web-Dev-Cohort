import { useState, useMemo } from "react";

// In this assignment, your task is to create a component that performs an expensive calculation (finding the factorial) based on a user input. 
// Use useMemo to ensure that the calculation is only recomputed when the input changes, not on every render.

export function Assignment1() {
    const [input, setInput] = useState(0);

    function factorial(n) {
        if (!Number.isInteger) return 0;
        if (n == 1 || n == 0) return n;
        return n * factorial(n - 1);
    }

    const expensiveValue = useMemo(() => factorial(input), [input]);

    return (
        <div>
            <input
                type="number"
                value={input}
                onChange={(e) => setInput(Number(e.target.value))}
                min={0}
            />
            <p>Calculated Value: {expensiveValue}</p>
        </div>
    );
}