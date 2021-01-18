import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import slugify from 'slugify';
import 'react-toastify/dist/ReactToastify.css';
import Form from '../components/Form';
import Loader from 'react-loader-spinner';
import * as moviesApi from '../services/movies-api';

export default function MoviesPage() {
  const location = useLocation();
  const history = useHistory();
  const { url } = useRouteMatch();
  const initialQuery = new URLSearchParams(location.search).get('query') ?? '';
  const [query, setQuery] = useState(initialQuery);
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (query === '') {
      return;
    }
    setStatus('pending');
    moviesApi
      .fetchQuery(query)
      .then(({ results }) => setMovies(results))
      .then(() => setStatus('resolve'));
    history.push({ ...location, search: `query=${query}` });
  }, [query]);

  return (
    <section>
      <Form onSubmit={setQuery} />
      <ToastContainer autoClose={3000} />
      {status === 'pending' && (
        <div className="LoaderContainer">
          <Loader type="TailSpin" color="#00BFFF" height={40} width={40} />
        </div>
      )}
      {movies && (
        <ul>
          {movies.map(({ id, title }) => (
            <li key={id}>
              <Link
                to={{
                  pathname: `${url}/${slugify(`${title} ${id}`, {
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
