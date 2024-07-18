import React from 'react'
import { MdEmail } from "react-icons/md";
import { MdPhone } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";



const ContactInfo = () => {
  return (
    <div id='contanct' className='w-full h-fit bg-white rounded-md shadow-sm flex flex-col gap-2 p-4 items-center'>

            <div className='flex w-12 h-12 bg-blue-300 rounded-md'>

            </div>
            <div className='flex flex-col items-center'>
                <p className='text-black text-nowrap text-left text-[0.8rem] font-semibold'>Joan Tyler</p>
                <p className='text-black text-nowrap text-left text-[0.6rem] font-semibold'>CEO <span className='font-medium text-blue-300'>@Agentnoon</span></p> 
            </div>
           
            <div className="flex flex-col w-full mt-5 gap-2">
                <div className='flex flex-row gap-2 items-center'>
                        <FaMapLocationDot className='bg-blue-300 p-1 rounded-md w-5 h-5 text-white' />
                        <p className='text-black text-nowrap text-left text-[0.6rem] font-semibold'>Toronto, Canada</p>
                    </div>
                    <div className='flex flex-row gap-2 items-center'>
                        <MdEmail className='bg-blue-300 p-1 rounded-md w-5 h-5 text-white font' />
                        <p className='text-black text-nowrap text-left text-[0.6rem] font-semibold'>Imranisrehman@gmail.com</p>
                    </div>
                    <div className='flex flex-row gap-2 items-center'>
                        <MdPhone className='bg-blue-300 p-1 rounded-md w-5 h-5 text-white' />
                        <p className='text-black text-nowrap text-left text-[0.6rem] font-semibold'>+1 (647)-999-9999</p>
                    </div>
                
            </div>

            <div className='flex flex-wrap gap-2 mt-4 w-fit'>
                <p className='bg-blue-100 w-fit h-fit px-2 py-1 rounded-md text-[0.6rem] font-semibold shadow-md text-nowrap'>Level: 1</p>
                <p className='bg-red-100 w-fit h-fit px-2 py-1 rounded-md text-[0.6rem] font-semibold shadow-md text-nowrap'>Fixed Term - Local</p>
                <p className='bg-green-100 w-fit h-fit px-2 py-1 rounded-md text-[0.6rem] font-semibold shadow-md text-nowrap'>👏 Exceeds Expectations</p>
            </div>

        </div>
  )
}

export default ContactInfo