import Handle from 'rc-slider/lib/Handles/Handle'
import React from 'react'

const TextInput = ({ title, state, setState, limit }) => {
    const handleChange = (e) => {

         if (!e.target.checkValidity()) window.alert("Value must between 0 to 100")
        else setState(e.target.value)

        // let value = e.target.value
        // if (limit) {

        //     if (value != '' && value > 100) {
        //         value = value.slice(0, -1)
        //     }

        //     if (value != '' && value < 0) {
        //         value = 0
        //     }
        // }

        // setState(value)

    }
    return (
        <>
            <label className='text-sm font-semibold' htmlFor={title}>{title}</label>
            <input
                value={state}
                onChange={handleChange}
                type="number"
                id={title}
                placeholder={title}
                className="p-2 text-xs outline-none shadow-md bg-neutral-100" />
        </>
    )
}

export default TextInput
