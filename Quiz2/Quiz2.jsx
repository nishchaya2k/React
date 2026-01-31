import React, { useState } from 'react';

const style = {
    container: {
        padding: '20px',
        border: '1px solid #E0E0E0',
        borderRadius: '15px',
        width: 'max-content',
        marginBottom: '40px',
    },
    question: {
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    options: {
        marginBottom: '5px',
    },
    button: {
        marginTop: '10px',
        padding: '10px 15px',
        border: 'none',
        backgroundColor: '#007BFF',
        color: '#FFF',
        fontSize: '14px',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    feedback: {
        marginTop: '10px',
        fontSize: '14px',
    },
};

export function QuizApp2() {
    const [answer, setAnswer] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState("");

    const questions = [
        {
            id: "1212",
            question: 'What is the capital of France?',
            options: ['London', 'Paris', 'Berlin', 'Madrid'],
            correct: 'Paris',
        },
        {
            id: "1213",
            question: 'What is the capital of Germany?',
            options: ['Berlin', 'Munich', 'Frankfurt', 'Hamburg'],
            correct: 'Berlin',
        },
    ];

    const isFinished = currentIndex === questions.length;
    const currentQuestion = questions[currentIndex];

    const handleSubmit = () => {
        if (!answer) return;

        let nextScore = score;

        if (answer === currentQuestion.correct) {
            nextScore = score + 1;
            setScore(nextScore);
            setFeedback("Correct!");
        } else {
            setFeedback("Incorrect!");
        }

        setAnswer("");

        if (currentIndex + 1 === questions.length) {
            setFeedback(
                `Quiz Complete! You scored ${nextScore} out of ${questions.length}!`
            );
        }

        setCurrentIndex(prev => prev + 1);
    };

    return (
        <div style={style.container}>
            {/* Final Screen */}
            {isFinished ? (
                <div id="feedback" style={style.feedback}>{feedback}</div>
            ) : (
                <>
                    {/* Previous Feedback */}
                    {currentIndex !== 0 && (
                        <div id="feedback" style={style.feedback}>{feedback}</div>
                    )}

                    {/* Question */}
                    <div id="question" style={style.question}>
                        {currentQuestion.question}
                    </div>

                    {/* Options */}
                    <div style={style.options}>
                        {currentQuestion.options.map(option => (
                            <div key={option}>
                                <input
                                    type="radio"
                                    value={option}
                                    checked={answer === option}
                                    onChange={() => setAnswer(option)}
                                />
                                <label>{option}</label>
                            </div>
                        ))}
                    </div>

                    {/* Submit */}
                    <button
                        style={style.button}
                        id="submitBtn"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </>
            )}
        </div>
    );
}
