import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Detail.module.css';
import YouTube from 'react-youtube';
import Header from './Header';
import Footer from './Footer';

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState();

  useEffect(() => {
    const getMovie = async () => {
      const json = await (
        await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
      ).json();
      setMovie(json.data.movie);
      setLoading(false);
    };

    getMovie();
  }, [id]);

  console.log(movie);

  const backgroundStyle = {
    backgroundImage: `url(${movie?.background_image_original})`, // 배경 이미지 설정
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div>
      <div>
        {loading ? (
          <div className={styles.loader}>
            <span>Loading...</span>
          </div>
        ) : (
          <div className={styles.container} style={backgroundStyle}>
            <Header />
            <div className={styles.contents}>
              <div className={styles.title}>
                <h1>{movie.title}</h1>
              </div>
              <div className={styles.movie_img}>
                <div className={styles.movie_size}>
                  <img src={movie.medium_cover_image} alt={movie.title} />
                </div>
                {movie.yt_trailer_code ? (
                  <YouTube
                    videoId={movie.yt_trailer_code}
                    opts={{
                      width: '450',
                      height: '345',
                      playerVars: {
                        autoplay: 1, //자동재생 O
                        rel: 0, //관련 동영상 표시하지 않음 (근데 별로 쓸모 없는듯..)
                        modestbranding: 1, // 컨트롤 바에 youtube 로고를 표시하지 않음
                      },
                    }}
                    //이벤트 리스너
                    onEnd={(e) => {
                      e.target.stopVideo(0);
                    }}
                  />
                ) : null}
              </div>
              <div className={styles.movie_content}>
                <p>Rating: {movie.rating}</p>
                <p>Strory:</p>
                <p>{movie.description_intro}</p>
                <div>
                  <strong>{'Genres: '}</strong>
                  {movie.genres.map((kind) => (
                    <strong key={kind}> {`${kind}, `}</strong>
                  ))}
                </div>
              </div>
              <Footer />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Detail;
