import React from 'react'

const Box = (props) => {

    const { lightOn, handleClick } = props;

    return (
        <div className={`p-4 w-20 h-20 border border-black cursor-pointer ${lightOn ? 'bg-green-500' : ''}`} onClick={handleClick}>
        </div>
    )
}

export default Box
