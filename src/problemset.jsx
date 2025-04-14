import axios from "./api/axios.js";
import "./problemset.css";
import { useEffect, useState } from "react";
import QuestionCard from "./questioncard.jsx";
import { useNavigate, useSearchParams } from "react-router-dom";

const Problemset = () => {
    const [questions, setQuestions] = useState([]);
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const searchParamsObj = Object.fromEntries(searchParams);
    
    // Filter states
    const [filters, setFilters] = useState({
        difficulty: 'all',
        tag: 'all',
        status: 'all'
    });

    // Extract unique filter options
    const difficulties = ['all', ...new Set(questions.map(q => q.difficulty.toLowerCase()))];
    const tags = ['all', ...new Set(questions.flatMap(q => q.tags? [q.tags] : []))];
    console.log(questions);
    const questionsProviderHandler = async () => {
        try {
            const response = await axios.get('api/search', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                params: searchParamsObj
            });
            
            const actualResponse = response.data;
            
            if (actualResponse.result) {
                setQuestions(actualResponse.result);
                setFilteredQuestions(actualResponse.result);
            } else if (actualResponse.msg) { 
                window.alert(actualResponse.msg);
                navigate('/');
            }
        } catch (err) {
            console.log(err);
            window.alert("Something went wrong");
            navigate('/');
        }
    };

    // Apply filters whenever filters or questions change
    useEffect(() => {
        let result = [...questions];
        
        if (filters.difficulty !== 'all') {
            result = result.filter(q => q.difficulty.toLowerCase() === filters.difficulty);
        }
        
        if (filters.tag !== 'all') {
            result = result.filter(q => q.tags === filters.tag);
        }
        
        if (filters.status !== 'all') {
            // Assuming you have a status field in your question data
            // If not, you'll need to implement this based on your actual data structure
            result = result.filter(q => q.status === filters.status);
        }
        setFilteredQuestions(result);
    }, [filters, questions]);

    useEffect(() => {
        questionsProviderHandler();
    }, []);

    return (
        <div className="problemset-container">
            {/* Filter Section */}
            <div className="filter-section">
                <h2>Filter Questions</h2>
                <div className="filter-controls">
                    <div className="filter-group">
                        <label htmlFor="difficulty">Difficulty</label>
                        <select
                            id="difficulty"
                            value={filters.difficulty}
                            onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
                        >
                            {difficulties.map(diff => (
                                <option key={diff} value={diff}>
                                    {diff === 'all' ? 'All Difficulties' : diff.charAt(0).toUpperCase() + diff.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="filter-group">
                        <label htmlFor="tag">Topic</label>
                        <select
                            id="tag"
                            value={filters.tag}
                            onChange={(e) => setFilters({...filters, tag: e.target.value})}
                        >
                            {tags.map(tag => (
                                <option key={tag} value={tag}>
                                    {tag === 'all' ? 'All Topics' : tag}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="filter-group">
                        <label htmlFor="status">Status</label>
                        <select
                            id="status"
                            value={filters.status}
                            onChange={(e) => setFilters({...filters, status: e.target.value})}
                        >
                            <option value="all">All Statuses</option>
                            <option value="solved">Solved</option>
                            <option value="unsolved">Unsolved</option>
                        </select>
                    </div>
                    
                    <button 
                        className="reset-filters"
                        onClick={() => setFilters({
                            difficulty: 'all',
                            tag: 'all',
                            status: 'all'
                        })}
                    >
                        Reset Filters
                    </button>
                </div>
            </div>
            
            {/* Questions Grid */}
            <div className="questions-grid">
                {filteredQuestions.length > 0 ? (
                    filteredQuestions.map((question) => (
                        <QuestionCard key={question._id} problem={question} />
                    ))
                ) : (
                    <div className="no-results">
                        <p>No questions match your filters. Try adjusting your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Problemset;