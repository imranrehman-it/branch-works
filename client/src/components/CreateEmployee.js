import React from 'react'
import { Handle, Position, StepEdge } from '@xyflow/react';
import { useGlobalState } from '../utils/GlobalStateContext';
import  calculateNewPosition  from '..//utils/newPositionCalculation.js'
import { createNodeArray } from '../utils/createNodes'


const CreateEmployee = ({data}) => {
    
    const {nodes, setNodes, headTree, setHeadTree, setEdges, edges, expandNode} = useGlobalState();

    const employee = {
            "Employee Id": Math.floor(Math.random() * 100000),
            "Name": "New Guy",
            "Job Title": "CEO",
            "Email": "joan.teyler@godaddy.com",
            "Manager": null,
            "Status": "Active",
            "Start Date": "2018-01-01T05:00:00.000Z",
            "Department": "Data Analytics",
            "Location": "Toronto, Canada",
            "Salary": "$30,000,000",
            "End Date": null,
            "Photo": "https://ui-avatars.com/api/?name=Joan+Teyler&background=#f56417&color=fff",
            "Performance": "👏 Exceeds Expectations",
            "Project": "Acquisition",
            "Entity": "Agentnoon EU Inc.",
            "Skill": "Creative Strategy",
            "Source": "Recruitee",
            "level": data.parent['level'] + 1,
            "Business Pillar": "Expertise and Knowledge",
            "Business Sector": "Manufacturing",
            "Job Family": "Customer Operational Control",
            "Job Family Group": "Flight Operations",
            "Company Cluster": "Cluster N",
            "Company": "NCC NebulaWays Consulting China",
            "Company Hierarchy": "Corporate Communications",
            "Cost Center": "Legal-Contract Drafting",
            "Management Level": "Management",
            "Person Type": "Employee",
            "Employee Type": "Fixed Term - Local",
            "Work Shift": "Temporary",
            "country": "United Arab Emirates",
            "gender": "Female",
            "age": 45,
            "children": [
            ],
            "Descendant Count": 29999,
            "Total Cost": ""
    }

    const handleClick = () =>{
        //insert new employee as child of parent which is data.parent

        const parent = nodes[0].find((node) => node.id === data.parent['Employee Id'].toString());  
        
        const { x, y } = calculateNewPosition(parent.position.x, parent.position.y, data.parent.children.length, data.parent.children.length);
        const newEmployee = {
            id: employee['Employee Id'].toString(),
            data: { employee: employee, flowId: 0 },
            position: { x, y },
            type: 'employeeCard',
        };

        const newEdges = {
            id: `${data.parent['Employee Id']}-${employee['Employee Id']}`,
            source: data.parent['Employee Id'].toString(),
            target: employee['Employee Id'].toString(),
            data: { flowId: 0 },
            animated: true,
            style : { strokeWidth: 2 }
        };

       data.parent.children.push(employee);
       expandNode(data.parent, 0);

    }
  return (
    <>
        <Handle type="source" position={Position.Bottom} />
        <div className="flex flex-col w-[15rem] h-[20rem] bg-white shadow-md rounded-md p-4 items-center">
            <p className='text-center text-xl p-1 font-bold '>Create New Employee</p>
            <div className='flex flex-col items-center justify-center h-full'>
            <button onClick={handleClick} className='text-white text-center text-lg justify-around p-1 font-bold w-12 h-12 bg-black rounded-full'>+</button>
            </div>
        </div>
        <Handle type="source" position={Position.Bottom} id="a" />
        <Handle type="source" position={Position.Bottom} id="b" isConnectable='true' />
    </>
  )
}

export default CreateEmployee