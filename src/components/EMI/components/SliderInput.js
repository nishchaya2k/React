import React from 'react'
import { numberWithCommas } from '../utils/config'

const SliderInput = ({ title, subTitle, state, min, max, labelMin, labelMax, onChange }) => {
    return (
        <>
            <span className='text-sm font-semibold'>{title}</span>

            <div className='flex flex-col gap-4 -mt-2'>
                {state > 0 && <label className='font-medium text-sm underline underline-offset-2' htmlFor="downPayment">{subTitle}</label>}
                <input
                    min={min}
                    max={max}
                    value={state}
                    onChange={(e) => onChange(e.target.value)}
                    type="range"
                    id='downPayment'
                    step={100}
                    className="border cursor-pointer bg-neutral-100" />

                <div className='flex justify-between -mt-3'>
                    <span>{labelMin ?? numberWithCommas(min)}</span>
                    <span>{numberWithCommas(state)}</span>
                    <span>{labelMax ?? numberWithCommas(max)}</span>
                </div>

            </div>
        </>
    )
}

export default SliderInput
