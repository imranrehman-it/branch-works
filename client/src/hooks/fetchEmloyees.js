import { useState, useEffect } from "react";

const useFetchEmployees = () =>{
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchEmployeeEndpoint = `${process.env.REACT_APP_API_URL}/allEmployees`;

    useEffect(()=>{
        const fetchEmployees = async () =>{
            try{
                const response = await fetch(fetchEmployeeEndpoint);
                if(!response.ok){
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setData(data);
            }
            catch(err){
                console.error(err);
                setError(err);

            }
            finally{
                setLoading(false);
            }
        }
        fetchEmployees();
    },[]);
    return {data, loading, error};
}

export default useFetchEmployees;