import { useState, useEffect } from 'react';
import * as moviesApi from '../services/movies-api';
import ActorCard from '../components/ActorCard';
import PropTypes from 'prop-types';

export default function Cast({ movieId }) {
  const [actors, setActors] = useState(null);

  useEffect(() => {
    moviesApi.fetchActors(movieId).then(result => {
      setActors(result);
    });
  }, []);

  return (
    actors && (
      <ul className="CastList">
        {actors.cast.map(({ name, character, profile_path }, id) => (
          <li key={id} className="CastListItem">
            <ActorCard name={name} character={character} path={profile_path} />
          </li>
        ))}
      </ul>
    )
  );
}
Cast.propTypes = {
  movieId: PropTypes.string.isRequired,
};
