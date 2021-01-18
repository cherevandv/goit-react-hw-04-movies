import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import slugify from 'slugify';
import Loader from 'react-loader-spinner';
import * as moviesApi from '../services/movies-api';

export default function HomePage() {
  const location = useLocation();
  const [trends, setTrends] = useState([]);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    setStatus('pending');
    moviesApi
      .fetchTrending()
      .then(({ results }) => setTrends(results))
      .then(() => setStatus('resolve'));
  }, []);

  return (
    <section>
      <h1>Trending today</h1>
      {status === 'pending' && (
        <div className="LoaderContainer">
          <Loader type="TailSpin" color="#00BFFF" height={40} width={40} />
        </div>
      )}
      {trends && (
        <ul>
          {trends.map(({ id, title }) => (
            <li key={id}>
              <Link
                to={{
                  pathname: `/movies/${slugify(`${title} ${id}`, {
                    lower: true,
                  })}`,
                  state: { from: location },
                }}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
