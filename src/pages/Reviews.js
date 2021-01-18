import { useState, useEffect } from 'react';
import * as moviesApi from '../services/movies-api';

export default function Reviews({ movieId }) {
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    moviesApi.fetchReviews(movieId).then(result => {
      setReviews(result);
    });
  }, []);

  return (
    <>
      {reviews && (
        <ul>
          {reviews.results.map(({ author, content, id }) => (
            <li key={id}>
              <h3>Author: {author}</h3>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      )}
      {reviews && reviews.results.length === 0 && (
        <p>We don't have any reviews for this movie.</p>
      )}
    </>
  );
}
