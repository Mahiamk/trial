// App.jsx
import { useState } from "react";
import Header from "./components/common/header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/common/footer/Footer";
import Homepages from "./components/home/Homepages";
import CategoryPage from "./components/category/CategoryPage";
import NewsCard from "./api/NewsCard"; // Ensure this path is correct
import "./App.css";
import { fetchNewsByCategory } from "./api/newsApi";
import { Category } from "@mui/icons-material";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleCategoryChange = () => {
    setArticles([]);
    setLoading(true);
    setError(null);
  };

  fetchNewsByCategory(Category).then((fetchedArticles) => {setArticles(fetchedArticles); setLoading(false);}).catch((error) => {setError(error); setLoading(false);});

  return (
    <Router>
      <Header onCategoryChange={handleCategoryChange} />
      <Routes>
        <Route path="/" element={<Homepages />} />
        <Route
          path="/:category"
          element={<CategoryPage 
            articles={articles}
            loading={loading}
            error={error}
            />}
        />
        <Route
          path="/:category/:id"
          element={<NewsCard />}
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
