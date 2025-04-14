import axios from "./api/axios.js";
import "./search.css";
import { useEffect ,useState} from "react";
import QuestionCard from "./questioncard.jsx";
import { useNavigate } from "react-router-dom";


const Search=()=>{
    const [questions,setQuestions]=useState([]);
    const nevigate=useNavigate();
    const questionsProviderHandler=async()=>{
        try{
            const searchParms=JSON.parse(window.localStorage.getItem("searchParms"));
            console.log(searchParms);
            const response=await axios.get('api/search',{
                method:'GET',
                headers:{'Content-Type':'application/json'},
                params:searchParms
            });
            console.log(response);
            const result= response.data.result;
            console.log(result);
            if(result.length==0) setQuestions([]);
            setQuestions(result);
        }
        catch(err){
            console.log(err);
            window.localStorage.removeItem("searchParms");
            nevigate('/');
        }
    };
useEffect(() => {
        questionsProviderHandler();
    }, []);
    return(
        <div>
        {questions.map((question)=>{
        return <QuestionCard key={question._id} problem={question}/>
        })}
        </div>
    )
}

export default Search;