import Questioncard from "./questioncard";
import "./recommendation.css";
import { useEffect,useState } from "react";
import axios from "./api/axios.js";

const Recommendation=()=>{
    const [problem,setRecomended]=useState({});
    useEffect(() => {
        const fetchRecomended = async () => {
          try {
            const response = await axios.get(`/recommend`);
            console.log(response);
            const responseData=response.data;
            console.log(responseData);  
            if(responseData.question)
            setRecomended(responseData.question);
            else
            throw "no question found";
          } catch (error) {
            console.error('Error fetching recomended problems:', error);
          }
        };
        fetchRecomended();
      },[]);
    
    return(
        <>
            <Questioncard problem={problem}/>
        </>
    );
};

export default Recommendation;