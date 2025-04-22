import Sheetcard from "./sheetcard";
import "./sheets.css";
import { useState ,useEffect} from "react";
import axios from "./api/axios.js";
import { useSearchParams,Outlet } from "react-router-dom"; 
import SheetQuestionCard from "./sheetQuestionCard.jsx";
import SheetQuestions from "./sheetQuestions.jsx";

const sheets=()=>{
  const [searchParams, setSearchParams] = useSearchParams();
  const  [isLoading, setIsLoading] = useState(true);
  const  [sheets, setSheets] = useState();
  const sheetId=searchParams.get('id');
    useEffect(() => {
        const getAllSheets = async () => {
            try{
                const response = await axios.get('/api/sheets',{headers:{
                    'Content-Type': 'application/json'
                }});
                const sheetsData= response.data.sheets;
                // console.log(sheetsData);
                setSheets(sheetsData);
                setIsLoading(false);
            }
            catch(err){
                console.log(err);
            }
        }
      getAllSheets();

    },[searchParams]);
    return(isLoading?<div>Loading...</div>:(
    (
    !sheetId?
    <>
    <div id="sheet-sec">
        {sheets.map((sheet) => (
            <Sheetcard 
            key={sheet._id}
            sheetId={sheet._id}
            sheetName={sheet.title}
            followers={sheet.followers}
            questions={sheet.questions}
            followStatus={sheet.followStatus}
            description={sheet.description}
            />
        ))}
    </div>
    </>:<SheetQuestions/>
)));
};

export default sheets;