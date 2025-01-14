import PropTypes from 'prop-types';
import './NewsCard.css';

const NewsCard = ({ article }) => {
  return (
    <div className="news-card">
      <img 
        src={article.urlToImage || 'https://via.placeholder.com/300x200?text=No+Image'} 
        alt={article.title}
        className="news-image"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'; // Fallback image
        }}
      />
      <div className="news-content">
        <h3 className="news-title">{article.title}</h3>
        <p className="news-description">{article.description}</p>
        <div className="news-metadata">
          <span className="news-author">{article.author || 'Unknown Author'}</span>
          <span className="news-date">
            {new Date(article.publishedAt).toLocaleDateString()}
          </span>
        </div>
        <a 
          href={article.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="read-more"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

NewsCard.propTypes = {
  article: PropTypes.shape({
    urlToImage: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    author: PropTypes.string,
    publishedAt: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }).isRequired
};

export default NewsCard;
