import PropTypes from 'prop-types';
import s from './MovieDetailsCart.module.css';

export default function MovieDetailsCart({ movieDetail }) {
  const { poster_path, title, vote_average, overview, genres } = movieDetail;
  return (
    <div className={s.container}>
      <img
        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
        alt={title}
        width="200"
        className={s.img}
      />
      <div>
        <h2>{title}</h2>
        <p>User Score: {vote_average}</p>
        <h3>Overview</h3>
        <p>{overview}</p>
        <h3>Genres</h3>
        <ul className={s.list}>
          {genres.map((genre, id) => (
            <li key={id} className={s.listItem}>
              {genre.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

MovieDetailsCart.propTypes = {
  movieDetail: PropTypes.object.isRequired,
};
