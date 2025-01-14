import { useParams } from "react-router-dom";
import NewsCard from "../../api/NewsCard";
const CategoryPage = ({ articles, loading, error }) => {
  const { category } = useParams(); // Extract category from the URL
  console.log('Category from useParams:', category);  // Debugging line

  if (loading) return <div>Loading...</div>;  // Display loading message
  if (error) return <div>{error}</div>;      // Display error message

  return (
    <div>
      <h2>{category.charAt(0).toUpperCase() + category.slice(1)} News</h2>
      <div className="news-list">
        {/* Check if there are articles */}
        {articles && articles.length > 0 ? (
          articles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))
        ) : (
          <p>No articles available for this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
import PropTypes from 'prop-types';

CategoryPage.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      url: PropTypes.string.isRequired,
      urlToImage: PropTypes.string,
      publishedAt: PropTypes.string.isRequired,
      content: PropTypes.string,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};