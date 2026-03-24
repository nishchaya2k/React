import React, { useState, useMemo, useEffect, useCallback } from 'react';
import dummyData from '../../../utils/dummyJson';

function getLen(dummyData) {
    console.log("I am calculating")
    let count = 0;
    for (let i = 0; i < dummyData.length; i++)count++;
    return count;
}

const Child_1 = (props) => {

    const totalEntries = useMemo(() => getLen(dummyData), [])

    console.log("Child_1 Rendered")

    const handleOnWindowLoad = useCallback(() => {
        console.log("Loaded")
    }, [])

    useEffect(() => {
        window.addEventListener("load", handleOnWindowLoad)
        return () => {
            window.removeEventListener("load", handleOnWindowLoad)
        }
    }, [handleOnWindowLoad])

    return (
        <div>
            <h1>Hi, Here the Entries</h1>
            <h3>Total Items: {totalEntries}</h3>
            <h3>Count {props.state}</h3>
        </div>
    )
}

export default Child_1

