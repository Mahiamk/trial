import PropTypes from 'prop-types'; // Import PropTypes
import NewsCard from './NewsCard';
import './NewsList.css'; // Import the CSS file


const NewsList = ({ articles }) => {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-7 gap-9">
      {articles.map((article, index) => (
        <div key={index} className="news-item">
          {article.urlToImage && (
            <img 
              src={article.urlToImage} 
              alt={article.title} 
              className="news-image"
            />
          )}
          <NewsCard article={article} />
        </div>
      ))}
    </div>
  );
};

// Prop validation for the 'articles' prop
NewsList.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      url: PropTypes.string.isRequired,
      urlToImage: PropTypes.string,
      publishedAt: PropTypes.string,
    })
  ).isRequired,
};

export default NewsList;
