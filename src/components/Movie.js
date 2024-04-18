import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './Movie.module.css';

function Movie({ id, coverImg, year, title, genres }) {
  return (
    <div className={styles.movie}>
      <Link to={`${process.env.PUBLIC_URL}/movie/${id}`}>
        <img src={coverImg} alt={title} className={styles.movie_img} />
      </Link>
      <div className={styles.intext}>
        <h2 className={styles.movie_title}>
          <Link to={`${process.env.PUBLIC_URL}/movie/${id}`}>{title}</Link>
        </h2>
        <div className={styles.movie_year}>
          <span>{year}</span>
        </div>
        <ul className={styles.movie_genres}>
          {genres.map((kind) => (
            <li key={kind}>{kind}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Movie;
