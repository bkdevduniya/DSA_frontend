import axios from "./api/axios.js";
import "./problemset.css";
import { useEffect, useState } from "react";
import QuestionCard from "./questioncardProblemset.jsx";
import { useNavigate, useSearchParams } from "react-router-dom";
const Problemset = () => {
    const [questions, setQuestions] = useState([]);
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const searchParamsObj = Object.fromEntries(searchParams);
    const [qnStatus, setStatus] = useState([new Set(), new Set()]);
    // Filter states
    const [filters, setFilters] = useState({
        difficulty: 'all',
        tag: 'all',
        status: 'all'
    });
    // Extract unique filter options
    const difficulties = ['all', ...new Set(questions.map(q => q.difficulty?.toLowerCase()))];
    const tags = ['all', ...new Set(questions.flatMap(q => q.tags || []))];
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
        } finally {
            setIsLoading(false);
        }
    };
    // Apply filters
    useEffect(() => {
        let result = [...questions];
        if (filters.difficulty !== 'all') {
            result = result.filter(q => q.difficulty?.toLowerCase() === filters.difficulty);
        }
        if (filters.tag !== 'all') {
            result = result.filter(q => q.tags?.includes(filters.tag));
        }
        if (filters.status !== 'all') {
            result = result.filter(q => q.status === filters.status);
        }
        setFilteredQuestions(result);
    }, [filters, questions]);
    useEffect(() => {
        let result = [...questions];
        result = result.map((qn) => {
            if (qnStatus[0].has(qn.title)) {
                qn.status = 'solved';
            }
            else if (qnStatus[1].has(qn.title)) {
                qn.status = 'unsolved';
            }
            return qn;
        });
        setQuestions(result);
    }, [qnStatus]);

    useEffect(() => {
        questionsProviderHandler();
    }, []);
    
    if (isLoading) {
        return (
            <div className="problemset-loading-overlay">
                <div className="problemset-loading-spinner">
                    <div className="problemset-spinner-circle"></div>
                    <div className="problemset-loading-text">Loading problems...</div>
                </div>
            </div>
        );
    }
    return (
        <div className="problemset-container">
            {/* Filter Section */}
            <div className="problemset-filter-section">
                <h2>Filter Questions</h2>
                <div className="problemset-filter-controls">
                    <div className="problemset-filter-group">
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
                    <div className="problemset-filter-group">
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
                    <div className="problemset-filter-group">
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
                        className="problemset-reset-filters"
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
            {/* Questions List */}
            <div className="problemset-questions-list">
                {filteredQuestions.length > 0 ? (
                    filteredQuestions.map((question) => (
                        <QuestionCard 
                            key={question._id}
                            problem={question}
                            statusChange={setStatus}
                            curStatus={qnStatus}
                        />
                    ))
                ) : (
                    <div className="problemset-no-results">
                        <div className="problemset-no-results-icon">🔍</div>
                        <h3>No questions found</h3>
                        <p>No questions match your filters. Try adjusting your criteria.</p>
                        <button onClick={() => setFilters({
                            difficulty: 'all',
                            tag: 'all',
                            status: 'all'
                        })}>
                            Reset All Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Problemset;