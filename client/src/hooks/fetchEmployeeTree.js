import { useState, useEffect } from "react";

const useFetchEmployeeTree = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTreeEndpoint = `${process.env.REACT_APP_API_URL}/employees`;

    useEffect(()=>{
        const fetchEmployees = async () =>{
            try{
                const response = await fetch(fetchTreeEndpoint);
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
};

export default useFetchEmployeeTree;