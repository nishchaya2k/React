// Develop a quiz application where users can answer multiple - choice questions and see their score at the end.

import React, { useState } from 'react'

const data = [
    {
        id: '1',
        question: "What is the capital of France?",
        options: [
            "Berlin",
            "Madrid",
            "Paris",
            "Rome"
        ],
        answer: "Paris"
    },
    {
        id: '2',
        question: "What is 2 + 2?",
        options: [
            "3",
            "4",
            "5",
            "6"
        ],
        answer: "4"
    },
    {
        id: '3',
        question: "Which planet is known as the Red Planet?",
        options: [
            "Earth",
            "Mars",
            "Jupiter",
            "Venus"
        ],
        answer: "Mars"
    },
    {
        id: '4',
        question: "Who wrote 'To Kill a Mockingbird'?",
        options: [
            "Harper Lee",
            "Mark Twain",
            "Ernest Hemingway",
            "J.K. Rowling"
        ],
        answer: "Harper Lee"
    },
    {
        id: '5',
        question: "What is the largest ocean on Earth?",
        options: [
            "Atlantic Ocean",
            "Indian Ocean",
            "Arctic Ocean",
            "Pacific Ocean"
        ],
        answer: "Pacific Ocean"
    },
    {
        id: '6',
        question: "In which year did the Titanic sink?",
        options: [
            "1910",
            "1912",
            "1914",
            "1916"
        ],
        answer: "1912"
    },
    {
        id: '7',
        question: "What is the chemical symbol for gold?",
        options: [
            "Au",
            "Ag",
            "Pb",
            "Fe"
        ],
        answer: "Au"
    },
    {
        id: '8',
        question: "Who painted the Mona Lisa?",
        options: [
            "Vincent van Gogh",
            "Leonardo da Vinci",
            "Pablo Picasso",
            "Claude Monet"
        ],
        answer: "Leonardo da Vinci"
    },
    {
        id: '9',
        question: "What is the smallest prime number?",
        options: [
            "0",
            "1",
            "2",
            "3"
        ],
        answer: "2"
    },
    {
        id: '10',
        question: "Which element has the atomic number 1?",
        options: [
            "Helium",
            "Hydrogen",
            "Lithium",
            "Beryllium"
        ],
        answer: "Hydrogen"
    }
];



const Quiz = () => {

    const [selectedOptions, setSelectedOptions] = useState({})

    const handleChange = (e, id) => {
        setSelectedOptions(prev => ({
            ...prev,
            [id]: e.target.value
        }))
    }


    const handleSubmit = (e) => {
        e.preventDefault()  //to avoid default behivor of page reloading

        const calculatedScore = data.reduce((acc, item) => {
            if (selectedOptions[item.id] === item.answer) return acc + 1;

            return acc;
        }, 0)

        alert(`Score: ${calculatedScore}`);
    }

    return (
        <div className=' flex flex-col gap-6'>
            <form onSubmit={handleSubmit}>
                {
                    data.map((item, index) => (
                        <div key={item.id} id={item.id} className='flex flex-col gap-1 pl-2'>
                            <label><span>{index + 1}.</span> {item.question}</label>
                            {
                                item.options.map((option) => (
                                    <label key={item.id + option}>
                                        <input
                                            type='radio'
                                            className='cursor-pointer'
                                            onChange={(e) => handleChange(e, item.id)}
                                            value={option}
                                            checked={option === selectedOptions[item.id]}
                                        /> {" "}
                                        {option}
                                    </label>
                                ))
                            }
                        </div>
                    ))
                }
                <button className='mt-6 p-1 px-3 bg-gray-400 rounded-sm' type='submit'>Submit</button>
            </form>

        </div>
    )
}

export default Quiz


/*
Notes:

-   onChange={handleChange(item.id)}
    Immediate Execution: handleChange(item.id) is executed immediately during rendering, not when the user interacts. This means the handleChange function runs during render and returns its result (which is typically undefined if it doesn’t return anything), and that result is assigned to onChange.

-   onChange={(e) => handleChange(e, item.id)}
    Function Reference: Passing a function reference (e.g., (e) => handleChange(e, item.id)) means you are giving React a function to call when the event happens. This function will be executed only when the user interacts with the element (e.g., changing a radio button).

-   value={option}:
    This sets the value of the radio button to the specific option (e.g., "Berlin", "Paris"). This is the value that the radio button represents and what gets selected when the user clicks it.
    checked={selectedOptions[item.id] === option}:

-   This checks whether the value of this radio button matches the currently selected option    
    for that question. If it matches, the radio button will be marked as selected.

*/