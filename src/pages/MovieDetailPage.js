import { useState, useEffect, lazy, Suspense } from 'react';
import {
  NavLink,
  useParams,
  useRouteMatch,
  Route,
  useLocation,
  useHistory,
} from 'react-router-dom';
import MovieDetailsCart from '../components/MovieDetailsCart';
import * as moviesApi from '../services/movies-api';

const Cast = lazy(() => import('./Cast' /*webpackChunkName: "cast" */));
const Reviews = lazy(() =>
  import('./Reviews' /*webpackChunkName: "reviews" */),
);

export default function MovieDetailPage() {
  const history = useHistory();
  const location = useLocation();
  const { url, path } = useRouteMatch();
  const { slug } = useParams();
  const movieId = slug.match(/[a-z0-9]+$/)[0];
  const [movieDetail, setMovieDetail] = useState(null);

  useEffect(() => {
    moviesApi.fetchMovie(movieId).then(result => {
      setMovieDetail(result);
    });
  }, []);

  const onGoBack = () => {
    history.push(location?.state?.from ?? '/');
  };

  return (
    <section>
      <button type="button" onClick={onGoBack}>
        Go back
      </button>

      {movieDetail && (
        <>
          <div>
            <MovieDetailsCart movieDetail={movieDetail} />
          </div>
          <div>
            <ul>
              Additional information
              <li>
                <NavLink
                  to={{
                    pathname: `${url}/cast`,
                    state: { from: location?.state?.from ?? '/' },
                  }}
                >
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: `${url}/reviews`,
                    state: { from: location?.state?.from ?? '/' },
                  }}
                >
                  Reviews
                </NavLink>
              </li>
            </ul>
          </div>
          <Suspense fallback={<p>Загружаем...</p>}>
            <Route path={`${path}/cast`}>
              <Cast movieId={movieId} />
            </Route>
            <Route path={`${path}/reviews`}>
              <Reviews movieId={movieId} />
            </Route>
          </Suspense>
        </>
      )}
    </section>
  );
}
