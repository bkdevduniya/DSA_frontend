import Questioncard from "./questioncard";
import "./recommendation.css";
import { useEffect,useState } from "react";
import axios from "./api/axios.js";
const Recommendation=()=>{
    const [data,setData]=useState({});
    useEffect(() => {
        return setData(axios.get("/home"));
    },[]);

    return(
        
        <>
        <div id="recommend-sec">
            <h1>{data.status}</h1>
            <Questioncard/>
        </div>
        </>
    );
};

export default Recommendation;