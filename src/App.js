import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import Loader from 'react-loader-spinner';

const HomePage = lazy(() =>
  import('./pages/HomePage' /*webpackChunkName: "home-page" */),
);
const MoviesPage = lazy(() =>
  import('./pages/MoviesPage' /*webpackChunkName: "movies-page" */),
);
const MovieDetailsPage = lazy(() =>
  import('./pages/MovieDetailPage' /*webpackChunkName: "movie-detail-page" */),
);

function App() {
  return (
    <>
      <Navigation />
      <Suspense
        fallback={
          <div className="LoaderContainer">
            <Loader type="TailSpin" color="#00BFFF" height={40} width={40} />
          </div>
        }
      >
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/movies" exact>
            <MoviesPage />
          </Route>
          <Route path="/movies/:slug">
            <MovieDetailsPage />
          </Route>
          <Route>
            <HomePage />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
