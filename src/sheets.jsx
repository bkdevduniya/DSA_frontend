import Sheetcard from "./sheetcard";
import "./sheets.css";
import { useState, useEffect } from "react";
import axios from "./api/axios.js";
import { useSearchParams, Outlet } from "react-router-dom"; 
import SheetQuestionCard from "./sheetQuestionCard.jsx";
import SheetQuestions from "./sheetQuestions.jsx";

const Sheets = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [sheets, setSheets] = useState([]);
  const [showAllSheets, setShowAllSheets] = useState(false);
  const sheetId = searchParams.get('id');
  const initialSheetsToShow = 6;

  useEffect(() => {
    const getAllSheets = async () => {
      try {
        const response = await axios.get('/api/sheets', {
          headers: { 'Content-Type': 'application/json' }
        });
        const sheetsData = response.data.sheets;
        setSheets(sheetsData);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        window.alert("user not logged in");
        window.location.href='/';
      }
    };
    getAllSheets();
    window.scrollTo(0, 0);
  }, [searchParams]);

  const toggleShowAllSheets = () => {
    setShowAllSheets(!showAllSheets);
  };

  const displayedSheets = showAllSheets ? sheets : sheets.slice(0, initialSheetsToShow);

   return (
    isLoading ? 
    <div className="sheet-loading">Loading...</div> : 
    (!sheetId ? 
    <div className="sheets-container">
      <div className="sheets-header">
        <h1 className="header-main-title">Popular Sheets to Follow</h1>
        <div className="header-full-width-underline"></div> {/* New underline element */}
        <p className="header-subtitle">Curated collections to boost your learning journey</p>
      </div>
      <div id="sheet-sec">
        {displayedSheets.map((sheet) => (
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
      {sheets.length > initialSheetsToShow && (
        <div className="show-more-container">
          <button 
            className="show-more-button" 
            onClick={toggleShowAllSheets}
          >
            {showAllSheets ? 'Show Less' : 'Show More'}
            <span className={`arrow ${showAllSheets ? 'up' : 'down'}`}></span>
          </button>
        </div>
      )}
    </div> : 
    <SheetQuestions />
    )
  );
};

export default Sheets;