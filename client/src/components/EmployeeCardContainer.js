import React from 'react'

export const EmployeeCardContainer = ({employee}) => {
  return (
    <div className="flex flex-col w[30%] bg-white shadow-md rounded-md p-4 items-center">
      <div className='header flex flex-col items-center'>
        <p className='text-white text-center text-lg justify-around p-1 font-bold w-10 h-10 bg-black rounded-full absolute -translate-y-8'>IR</p>
        <h1 className='text-black text-nowrap text-left text-lg font-semibold mt-3'>{employee['Name']}</h1>
        <p className='text-black text-nowrap text-left text-sm'>CEO</p>
        <p className='bg-white w-fit h-fit px-2 py-1 rounded-full text-[0.6rem] font-semibold text-nowrap mt-1 shadow-inner'>Engineering</p>
      </div>
      <div className='flex flex-col items-center w-full h-full bg-white rounded-md mt-2 p-2 '>
                <div className='flex flex-wrap justify-center gap-1 h-full'>
                    <p className='bg-purple-100 w-fit h-fit px-2 py-1 rounded-full text-sm shadow-lg font-semibold text-nowrap'>📍Toronto, Canada</p>
                    <p className='bg-blue-100 w-fit h-fit px-2 py-1 rounded-full text-sm font-semibold shadow-md text-nowrap'>Level: 1</p>
                    <p className='bg-blue-100 w-fit h-fit px-2 py-1 rounded-full text-sm font-semibold shadow-md text-nowrap'>Project: Platform</p>
                    <p className='bg-red-100 w-fit h-fit px-2 py-1 rounded-full text-sm font-semibold shadow-md text-nowrap'>Salary: 325,000</p>
                    <p className='bg-green-100 w-fit h-fit px-2 py-1 rounded-full text-sm font-semibold shadow-md text-nowrap'>IC Cost: 126.7M</p>
                    <p className='bg-green-100 w-fit h-fit px-2 py-1 rounded-full text-sm font-semibold shadow-md text-nowrap'>Gender: Male</p>
                    <p className='bg-yellow-100 w-fit h-fit px-2 py-1 rounded-full text-sm font-semibold shadow-md text-nowrap'>Management Cost: 154.3M</p>
                    <p className='bg-yellow-200 w-fit h-fit px-2 py-1 rounded-full text-sm font-semibold shadow-md text-nowrap'>🎉outstanding</p>
                    <p className='bg-blue-100 w-fit h-fit px-2 py-1 rounded-full text-sm font-semibold shadow-md text-nowrap'>Business Pillar: Integrity and Ethics</p>
                    <p className='bg-blue-100 w-fit h-fit px-2 py-1 rounded-full text-sm font-semibold shadow-md text-nowrap'>Job Title: Intermediate VP of Operations</p>
                
                </div>
            </div>
    </div>
  )
}
