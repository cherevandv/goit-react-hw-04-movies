import defaultImage from './defaultActor.png';
import PropTypes from 'prop-types';
import s from './ActorCard.module.css';

export default function ActorCard({ name, character, path }) {
  let url;
  path
    ? (url = `https://image.tmdb.org/t/p/w200/${path}`)
    : (url = defaultImage);
  return (
    <>
      <img src={url} alt={name} width="150" height="225" />
      <p className={s.name}>{name}</p>
      <p>{character}</p>
    </>
  );
}
ActorCard.propTypes = {
  name: PropTypes.string.isRequired,
  character: PropTypes.string.isRequired,
  path: PropTypes.string,
};
