import { useState, useEffect } from "react";

const useFetchEmployees = () =>{
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const fetchEmployees = async () =>{
            try{
                const response = await fetch('http://localhost:3001/allEmployees');
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