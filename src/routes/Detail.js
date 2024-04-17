import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);
  console.log(movie);
  return (
    <div>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          <h1>{movie.title}</h1>
          <img src={movie.medium_cover_image} alt={movie.title} />
          <div>
            <p>Rating: {movie.rating}</p>
            <p>Strory: {movie.description_full}</p>
            <div>
              <strong>{'Genres: '}</strong>
              {movie.genres.map((kind) => (
                <strong key={kind}> {`${kind}, `}</strong>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
