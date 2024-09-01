import React from 'react'

const Content = (props) => {

    const { name, description } = props
    return (
        <div className='w-72 h-80 p-4 flex flex-col flex-shrink-0 gap-2 border border-black'>
            <strong>{name}</strong>
            <p>{description}</p>
        </div>
    )
}

export default Content
