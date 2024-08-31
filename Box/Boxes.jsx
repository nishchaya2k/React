import React, { useState } from 'react';
import Box from './Box';

const Boxes = () => {
    const [value, setValue] = useState({});

    const ids = [1, 2, 3];

    const increment = (id) => {
        setValue(prev => ({
            ...prev,
            [id]: (prev[id] || 0) + 1
        }));
    };

    const decrement = (id) => {
        setValue(prev => ({
            ...prev,
            [id]: Math.max((prev[id] || 0) - 1, 0)
        }));
    };

    return (
        <div className='flex gap-4'>
            {ids.map(id => (
                <Box
                    key={id}
                    id={id}
                    value={value[id] || 0}
                    increment={increment}
                    decrement={decrement}
                />
            ))}
        </div>
    );
};

export default Boxes;



/*
Directly changing the prev object doesn’t guarantee that React will recognize that a change has occurred. React’s state update mechanism relies on the immutability of state to efficiently manage updates and re-renders.

The spread operator creates a new object with all properties of prev copied over and then overrides the property specified by [id]. This approach maintains immutability, which is a key principle in React for ensuring that updates are detected correctly.

*/