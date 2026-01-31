import React, { useEffect, useState } from 'react'
import { tenureData } from './utils/constants';
import { numberWithCommas } from './utils/config';
import TextInput from './components/TextInput';
import SliderInput from './components/SliderInput';

const EMI = () => {

    const [assetValue, setAssetValue] = useState(0);
    const [interestRate, setInterestRate] = useState(10);
    const [processingFee, setProcessingFee] = useState(1);
    const [downPayment, setDownPayment] = useState(0);
    const [emi, setEmi] = useState(0);
    const [tenure, setTenure] = useState(12)

    const calculateEMI = (downPayment) => {

        // EMI amount = [P x R x (1+R)^N]/[(1+R)^N-1]
        if (!assetValue) return;

        const loanAmt = assetValue - downPayment;
        const rateOfInterest = interestRate / 100;
        const numOfYears = tenure / 12;

        const EMI =
            (loanAmt * rateOfInterest * (1 + rateOfInterest) ** numOfYears) /
            ((1 + rateOfInterest) ** numOfYears - 1);

        return Number(EMI / 12).toFixed(0);
    }


    const calculateDP = (emi) => {
        if (!assetValue) return;

        const downPaymentPercentage = 100 - (emi / calculateEMI(0)) * 100;
        return Number((downPaymentPercentage / 100) * assetValue).toFixed(0);

    }

    const updateEmi = (value) => {

        if (!assetValue) return;

        const dp = Number(value);
        setDownPayment(dp.toFixed(0));

        const emi = calculateEMI(dp)
        setEmi(emi)
    }


    const updateDownPayment = (value) => {
        if (!assetValue) return;

        const emi = Number(value);
        setEmi(emi.toFixed(0));

        const dp = calculateDP(emi)
        setDownPayment(dp);
    }

    const totalEMI = () => {
        return numberWithCommas((emi * tenure).toFixed(0))
    }

    const totalDownPayment = () => {
        return numberWithCommas((Number(downPayment) + (assetValue - downPayment) * (processingFee / 100)).toFixed(0))
    }

    useEffect(() => {
        if (!(assetValue > 0)) {
            setDownPayment(0);
            setEmi(0);
        }

        const emi = calculateEMI(downPayment)
        setEmi(emi);

    }, [tenure, assetValue])

    return (

        <div className='w-1/2 flex flex-col gap-6 '>
            <h1 className='font-semibold text-3xl'>EMI Calculator</h1>


            <div className='flex flex-col gap-6'>

                <TextInput
                    title={"Total Cost of Asset"}
                    state={assetValue}
                    setState={setAssetValue}
                    limit={false}
                />

                <TextInput
                    title={"Interest rate (in %)"}
                    state={interestRate}
                    setState={setInterestRate}
                    limit={true}
                />

                <TextInput
                    title={"Processing Fee (in %)"}
                    state={processingFee}
                    setState={setProcessingFee}
                    limit={true}
                />

            </div>

            <div className='flex flex-col gap-6'>

                <SliderInput
                    title={"Down Payment"}
                    subTitle={`Total Down Payment - ${" "} ${totalDownPayment()}`}
                    state={downPayment}
                    min={0}
                    max={assetValue}
                    labelMin={'0%'}
                    labelMax={'100%'}
                    onChange={updateEmi}

                />


                <SliderInput
                    title={"Loan Per Month"}
                    subTitle={`Total Loan Amount - ${" "} ${totalEMI()} `}
                    state={emi}
                    min={calculateEMI(assetValue)}
                    max={calculateEMI(0)}
                    onChange={updateDownPayment}
                />
            </div>


            <div className='flex flex-col gap-4'>
                <span className='text-sm font-semibold'>Tenure</span>

                <div className='flex justify-between'>
                    {tenureData.map((t) => (
                        <button className={`w-28 h-14 flex justify-center items-center border  rounded-3xl cursor-pointer ${tenure === t ? 'bg-sky-400' : 'bg-stone-300'}`} key={t} onClick={() => setTenure(t)}>
                            {t}
                        </button>
                    ))}
                </div>
            </div>

        </div>

    )
}

export default EMI
