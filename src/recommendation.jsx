import Questioncard from "./questioncard";
import "./recommendation.css";
import { useEffect,useState } from "react";
import axios from "./api/axios.js";

const Recommendation=()=>{
    const [problems,setRecomended]=useState([]);
    const [isLoading,setIsLoding]=useState(true);
    useEffect(() => {
        const fetchRecomendedSingle = async () => {
          try {
            const response = await axios.get(`/recommend`,{
                headers:{'Content-Type':'application/json'}
            });
            console.log(response);
            const responseData=response.data;
            console.log(responseData);  
            setRecomended(responseData.questions);
            setIsLoding(false);
          } catch (error) {
            console.error('Error fetching recomended problems:', error);
          }
        };
        const fetchRecommendedMultiple=async()=>{
          try{
            const response=await axios.get('/recommend/multiple',{
              headers:{
                headers:{'Content-Type':'application/json'}
              }
            });
            console.log( response.data.questions);
            setRecomended(response.data.questions);
            setIsLoding(false);
          }
          catch(err){
            console.log("error",err);
          }
        }
        if(window.location.pathname=='/')
        fetchRecomendedSingle();
        else
        fetchRecommendedMultiple();
      },[]);
    return(
        !isLoading?
        <>
        {
          problems.map((qn,index)=>{
          return <Questioncard key={index} problem={qn}/>;
          })
        } 
        </>
        :<div>loading</div>
    );
};

export default Recommendation;