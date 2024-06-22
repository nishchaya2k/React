import { CgMathMinus } from "react-icons/cg";
import { LuPlus } from "react-icons/lu";

const Panel_Controlled = (props) => {

    const { question, answer, openQuestion, showQuestionHandler } = props;

    //state Lifting Up, we are handling showQuestionHandler from parent to achieve controllable component concept

    return (
        <div className='w-[30rem] rounded-md p-2 border border-black bg-slate-400'>
            <div className={`flex flex-col `}>
                <div className='flex justify-between'>
                    <h1>{question}</h1>
                    <div className='flex justify-center items-center text-xl font-semibold cursor-pointer' onClick={() => showQuestionHandler()} >{openQuestion ? <CgMathMinus /> : <LuPlus />}</div>

                </div>

                {openQuestion && <div className={`mt-4`}>{answer}</div>}
            </div>
        </div>
    )
}

export default Panel_Controlled
