import {React} from 'react';
import {useState} from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ isOpen, onClose, handleSave, state }) => {

    if (!isOpen) return null;

    const {
        employeeId, setEmployeeId,
        name, setName,
        jobTitle, setJobTitle,
        email, setEmail,
        location, setLocation,
        pillar, setPillar,
        sector, setSector,
        department, setDepartment,
        project, setProject,
        salary, setSalary,
        workShift, setWorkShift,
      } = state;




    return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-lg w-1/3 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-700">&times;</button>
        <h2 className="text-2xl font-bold mb-4">Create New Employee</h2>
        <form onSubmit={handleSave}>
            {/* Add form fields for employee details here */}
            <input onChange={(e)=>setEmployeeId(e.target.value)} type="number" placeholder="Employee Id" className="w-full mb-4 p-2 border rounded"/>
            <div id='name-input' className='flex flex-row gap-4'>
            <input onChange={(e)=>setName(e.target.value)} type="text" placeholder="Name" className="w-full mb-4 p-2 border rounded"/>
            <input onChange={(e)=>setJobTitle(e.target.value)} type="text" placeholder="Job Title" className="w-full mb-4 p-2 border rounded" />
            </div>

            <div className='flex flex-row gap-4'>
            <input id='email-input' onChange={(e)=>setEmail(e.target.value)} type="text" placeholder="Email Address" className="w-full mb-4 p-2 border rounded"  />
            <input id='email-input' onChange={(e)=>setLocation(e.target.value)} type="text" placeholder="Location" className="w-full mb-4 p-2 border rounded"  />
            </div>

            <div className='flex flex-row gap-4'>
            <input onChange={(e)=>setPillar(e.target.value)} type="text" placeholder="Pillar" className="w-full mb-4 p-2 border rounded"/>
            <input onChange={(e)=>setSector(e.target.value)} type="text" placeholder="Sector" className="w-full mb-4 p-2 border rounded"/>
            <input onChange={(e)=>setDepartment(e.target.value)} type="text" placeholder="Deparment" className="w-full mb-4 p-2 border rounded" />
            <input onChange={(e)=>setProject(e.target.value)} type="text" placeholder="Project" className="w-full mb-4 p-2 border rounded" />
            </div>

            <div className='flex flex-row gap-4'>
            <input onChange={(e)=>setSalary(e.target.value)} type="text" placeholder="Salary" className="w-full mb-4 p-2 border rounded"/>
            <input onChange={(e)=>setWorkShift(e.target.value)} type="text" placeholder="Work Shift" className="w-full mb-4 p-2 border rounded"/>    
            </div>

            {/* Add more input fields as required */}
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Save</button>
        </form>
        </div>
    </div>,
    document.body
    );
};

export default Modal;
