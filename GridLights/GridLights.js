import React, { useEffect, useState } from 'react';
import Box from './Box';

const GridLights = () => {
    const length = 6;
    const [lightOn, setLightOn] = useState({});
    const [clickOrder, setClickOrder] = useState([]);


    const handleClick = (index) => {

        setLightOn(prevIndex => (                  // to maintain individual state for each box
            { ...prevIndex, [index]: true }
        ))

        setClickOrder(prevOrder => [...prevOrder, index])  //contains all indeces to track
    }

    useEffect(() => {
        if (clickOrder.length === length) {
            const timer = setTimeout(() => {
                clickOrder.slice().reverse().forEach((index, i) => {
                    setTimeout(() => {
                        setLightOn(prevIndex => (
                            { ...prevIndex, [index]: false }
                        ))

                    }, i * 1000);
                });

            }, 2000)

            return () => clearTimeout(timer)
        }
    }, [clickOrder])


    return (
        <div className='h-96 w-80 p-1 flex flex-col justify-center items-center flex-wrap gap-8 border border-black'>
            {[...Array(length)].map((_, index) => (
                <Box
                    key={index}
                    lightOn={lightOn[index]}
                    handleClick={() => handleClick(index)}
                />
            ))}
        </div>
    );
}

export default GridLights;
