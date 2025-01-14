
import { useState, useEffect } from 'react';
import axios from 'axios';

const Page = () => {
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/news?page=${page}&limit=10`).then((res) => {
      setArticles(res.data.articles);
    });
  }, [page]);

  return (
    <div>
      {articles.map((article) => (
        <div key={article._id}>{article.title}</div>
      ))}
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Previous
      </button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
};

export default Page;
