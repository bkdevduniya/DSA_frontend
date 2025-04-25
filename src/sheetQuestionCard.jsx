import "./sheetQuestionCard.css";

export default function SheetQuestionCard(props) {
    return (
        <div className="sheet-question-card">
            <div className="question-content">
                <a href={props.question.url} target="_blank" rel="noopener noreferrer">
                    <h4 className="sheet-question-card-title">{props.question.questiontitle}</h4>
                </a>
            </div>
            {props.question.tags && (
                <div className="question-tags">
                    {props.question.tags.map((tag, index) =>{
                        console.log(tag);
                       return <span  key ={props.question.questiontitle + `${index}`} className="tag">{tag}</span>
                    })}
                </div>
            )}
        </div>
    );
};