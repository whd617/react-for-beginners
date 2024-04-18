import { useEffect, useState } from 'react';
import Movie from '../components/Movie';
import styles from './Home.module.css';
import Header from './Header';
import Footer from './Footer';

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const json = await (
      await fetch(
        'https://yts.mx/api/v2/list_movies.json?limit=50&minimum_rating=8.8&sort_by=year',
      )
    ).json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);
  console.log(movies);
  return (
    <div>
      <div className={styles.container}>
        {loading ? (
          <div className={styles.loader}>
            <span>Loading...</span>
          </div>
        ) : (
          <div>
            <Header />
            <div className={styles.movies}>
              {movies.map((movie) => (
                <Movie
                  key={movie.id}
                  id={movie.id}
                  coverImg={movie.medium_cover_image}
                  title={movie.title}
                  summary={movie.summary}
                  year={movie.year}
                  genres={movie.genres}
                />
              ))}
            </div>
            <Footer />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
