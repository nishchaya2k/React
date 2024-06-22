import Panel_Controlled from './Panel_Controlled'
import React, { useState } from 'react'

const faqData = [
    {
        question: "1. What is your return policy?",
        answer: "Our return policy allows you to return items within 30 days of purchase for a full refund. Items must be in their original condition and packaging."
    },
    {
        question: "2. How long does shipping take?",
        answer: "Shipping times vary depending on your location and the shipping method chosen. Standard shipping typically takes 5-7 business days."
    },
    {
        question: "3. Do you offer customer support?",
        answer: "Yes, we offer customer support via email, phone, and live chat. Our support team is available Monday through Friday, 9 AM to 5 PM (EST)."
    },
    {
        question: "4. How do I create an account?",
        answer: "Creating an account is easy. Click on the 'Sign Up' button at the top right corner of our homepage, fill in the required information, and click 'Submit.'"
    },
    {
        question: "5. Can I change or cancel my order?",
        answer: "If you need to change or cancel your order, please contact our customer service team as soon as possible."
    }
];

const Accordion_Controlled = () => {


    const [openQuestion, setOpenQuestion] = useState(null);


    const showQuestionHandler = (question) => {
        setOpenQuestion((previousQuestion) => { return previousQuestion == question ? null : question })
    }

    return (
        <div>
            <h1 className='font-semibold text-2xl tracking-normal'>FAQ's</h1>

            <div className='mt-3 flex flex-col gap-2 '>
                {faqData.map((data) => (
                    <Panel_Controlled key={data.question} question={data.question} answer={data.answer} openQuestion={openQuestion == data.question} showQuestionHandler={() => showQuestionHandler(data.question)} />
                ))}
            </div>

        </div>
    )
}

export default Accordion_Controlled;
