import "./sheetQuestionCard.css";

export default function SheetQuestionCard(props) {
    return (
        <div className="sheet-question-card">
            <div className="question-content">
                <a href={props.question.url} target="_blank" rel="noopener noreferrer">
                    <h1>{props.question.questiontitle}</h1>
                </a>
            </div>
            {props.question.tags && (
                <div className="question-tags">
                    {props.question.tags.map((tag, index) =>{
                       return <span  key ={index} className="tag">{props.question.tags}</span>
                    })}
                </div>
            )}
        </div>
    );
};