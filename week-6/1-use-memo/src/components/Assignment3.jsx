import { useState, useMemo, useRef } from 'react';

export const Assignment3 = () => {
    const [items, setItems] = useState([
        { name: 'Chocolates', value: 10 },
        { name: 'Chips', value: 20 },
        { name: 'Onion', value: 30 },
        { name: 'Tomato', value: 30 },
    ]);

    const totalValue = useMemo(() => {
        return items.reduce((acc, curr) => acc + curr.value, 0);
    }, [items]);

    const inputNameRef = useRef();
    const inputPriceRef = useRef();

    const handleAddItem = (e) => {
        e.preventDefault();
        const newItem = {
            name: inputNameRef.current.value,
            value: Number(inputPriceRef.current.value)
        };
        setItems([...items, newItem]);
        // Clear inputs after adding
        inputNameRef.current.value = '';
        inputPriceRef.current.value = '';
    };

    return (
        <div>
            <form onSubmit={handleAddItem}>
                <input type='text' placeholder='Item name' ref={inputNameRef} />
                <input type='number' placeholder='Item price' ref={inputPriceRef} />
                <button type="submit">Add Item</button>
            </form>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item.name} - Price: ${item.value}</li>
                ))}
            </ul>
            <p>Total Value: {totalValue}</p>
        </div>
    );
};
