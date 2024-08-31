import React from 'react';

const Box = ({ id, value, increment, decrement, selected }) => {
    return (
        <div>
            <div className={`w-20 h-20 border border-black flex justify-center items-center ${selected && `bg-green-400`}`}>
                {value}
            </div>
            <div className='flex justify-center gap-4 text-2xl'>
                <button onClick={() => decrement(id)}>-</button>
                <button onClick={() => increment(id)}>+</button>
            </div>
        </div>
    );
};

export default Box;
