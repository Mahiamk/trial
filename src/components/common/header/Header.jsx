import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { Link, useNavigate } from "react-router-dom";
import newsApi from "../../../api/newsApi";
import './Header.css';

const Header = ({ onCategoryChange }) => {
  const [navbar, setnavbar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);  // To manage loading state
  const [error, setError] = useState(null);  // To manage error state
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const navigate = useNavigate();

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.body.style.backgroundColor = isDarkTheme ? '#ffffff' : '#1a1a1a';
    document.body.style.color = isDarkTheme ? '#000000' : '#ffffff';
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(false);  // Set loading true before fetching
        const response = await newsApi.getTopHeadlines();
        const extractedCategories = response.sources.map((source) => source.category.name);
        const uniqueCategories = [...new Set(extractedCategories)];
        setCategories(uniqueCategories);
      } catch (error) {
        setError("Failed to fetch categories: " + error.message);  // Set error message
      } finally {
        setIsLoading(false);  // Set loading false when finished
      }
    };

    fetchCategories();
  }, []);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleCategoryChange = async (category) => {
    console.log('Selected category:', category);
    setCategories(categories);
  // Validate category before calling the API
  if (typeof category !== 'string') {
    console.error('Invalid category:', category);
    return;
  }

  try {
    const newsData = await newsApi.fetchNewsByCategory(category);
    console.log('Fetched news data:', newsData);
    // Handle the fetched news data
  } catch (error) {
    console.error('Error fetching news:', error);
  }
  onCategoryChange(category);
  setnavbar(false);
  navigate(`/${category}`);
};


  return (
    <header>
      <div className="container paddingSmal">
        <Link to="/" className="text-2xl font-bold">DailyPulse</Link>
        <button onClick={toggleTheme} className="theme-toggle">
          {isDarkTheme ? '☀️' : '🌙'}
        </button>

        <form>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className="p-2 rounded-l-md border border-black-300 w-full text-black"
              placeholder="Search news here..."
            />
            {isLoading ? (
              <p>Loading categories...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              // <ul>
              //   {categories.map((category, index) => (
              //     <li key={index} onClick={() => handleCategoryChange(category)}>
              //       {category}
              //     </li>
              //   ))}
              // </ul>
              <nav>
                <ul className={navbar ? "navbar" : 'flex'} onClick={() => setnavbar(false)}>
                  <li>
                    <Link to='/' onClick={() => handleCategoryChange({ target: { value: 'home' } })}>Home</Link>
                  </li>
                  <li>
                    <Link to='/technology' onClick={() => handleCategoryChange({ target: { value: 'technology' } })}>Technology</Link>
                  </li>
                  <li>
                    <Link to='/entertainment' onClick={() => handleCategoryChange({ target: { value: 'entertainment' } })}>Entertainment</Link>
                  </li>
                  <li>
                    <Link to='/business' onClick={() => handleCategoryChange({ target: { value: 'business' } })}>Business</Link>
                  </li>
                  <li>
                    <Link to='/sport' onClick={() => handleCategoryChange({ target: { value: 'sport' } })}>Sport</Link>
                  </li>
                  <li>
                    <Link to='/health' onClick={() => handleCategoryChange({ target: { value: 'health' } })}>Health</Link>
                  </li>
                </ul>
                <button className='barIcon' onClick={() => setnavbar(!navbar)}>
                  {navbar ? <i className="fa fa-times"></i> : <i className="fa fa-bars"></i>}
                </button>
              </nav>
            )}
          </form>
      </div>
    </header>
  );
};

Header.propTypes = {
  onCategoryChange: PropTypes.func.isRequired,
};

export default Header;
