import Questioncard from "./questioncard";
import "./recommendation.css";
import { useEffect,useState } from "react";
import axios from "./api/axios.js";
const Recommendation=()=>{
    const [data,setData]=useState({});
    useEffect(() => {
        async function getUser(){
            
         try{
         const data= await axios.get("/recommend");
         setData(data);
         }
         catch(err){
            console.log(err);
         }
        }
        getUser();
        //  return  () => {
        //     isMounted = false;
        //     controller.abort(); // Proper cleanup
        //   };
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