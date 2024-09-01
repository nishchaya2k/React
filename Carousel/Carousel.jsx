import React, { useEffect, useRef } from 'react'
import Content from './Content'

const Carousel = () => {
    const data = [
        {
            id: "1",
            name: "nishchaya",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore voluptas neque molestias labore natus explicabo totam, at perferendis, ipsa rerum qui, quisquam error tenetur perspiciatis repudiandae recusandae! Eos, at ab."
        },
        {
            id: "2",
            name: "virat",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore voluptas neque molestias labore natus explicabo totam, at perferendis, ipsa rerum qui, quisquam error tenetur perspiciatis repudiandae recusandae! Eos, at ab."
        },
        {
            id: "3",
            name: "rohit",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore voluptas neque molestias labore natus explicabo totam, at perferendis, ipsa rerum qui, quisquam error tenetur perspiciatis repudiandae recusandae! Eos, at ab."
        }

    ]

    const boxRef = useRef();
    let id;


    const navigation = () => {
        if (boxRef.current) {

            const container = boxRef.current;

            const scrollAmount = container.scrollLeft + container.offsetWidth + 16;

            if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 1) {
                container.scrollTo({
                    left: 0,
                    behavior: "smooth"
                })

            }

            else {
                container.scrollTo({
                    left: scrollAmount,
                    behavior: "smooth"
                })
            }

        }

    }


    useEffect(() => {

        id = setInterval(() => {
            navigation();
        }, 4000)

        console.log("d")
        return () => {
            clearInterval(id)
        }

    }, [])



    return (
        <div className='w-full h-full flex gap-4 justify-center items-center border border-black p-2'>
            <div ref={boxRef} className='w-72 h-80 flex gap-4 overflow-x-auto' style={{ scrollbarWidth: 'none' }}>
                {
                    data.map((item) => <Content key={item.id} name={item.name} description={item.description} />)
                }
            </div>

        </div>
    )
}

export default Carousel



/*
1.  Addition:

-   Handle with keyboard also
-   Handle with Touchpad also
-   Add bottom scrollbar of circle type

*/

/*
Notes: 

1. The scrollWidth property returns the width of an element, including padding, excluding borders, scrollbars or margins.

2. The scrollLeft property sets or returns the number of pixels an element's content is scrolled horizontally.

3. The clientWidth property returns the viewable width of an element in pixels, including padding, but not the border, scrollbar or margin.

*/