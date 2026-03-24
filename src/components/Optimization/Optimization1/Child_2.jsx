import { memo, React } from 'react'

const Child_2 = (props) => {
    const { onChildClick } = props;

    console.log("Child_2 Rendered")

    return (
        <div>
            <h2>Child_2 Component</h2>
            <button onClick={onChildClick}>
                Click From Child_2
            </button>
        </div>
    )
}

export default memo(Child_2)
