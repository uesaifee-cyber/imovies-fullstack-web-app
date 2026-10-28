import { useParams, Link } from 'react-router-dom';

const movieData = [
  {
    id: 1,
    title: 'Inception',
    year: 2010,
    genre: 'Sci-Fi',
    description:
      'A skilled thief enters peoples dreams to steal secrets and attempts an ambitious mission involving the world of dreams.',
    image:
      'https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg',
  },
  {
    id: 2,
    title: 'Interstellar',
    year: 2014,
    genre: 'Adventure',
    description:
      'A group of explorers travels beyond this galaxy to discover whether humanity has a future among the stars.',
    image:
      'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
  },
  {
    id: 3,
    title: 'The Dark Knight',
    year: 2008,
    genre: 'Action',
    description:
      'Batman faces a dangerous criminal who brings chaos to Gotham City and challenges its sense of justice.',
    image:
      'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
  },
  {
    id: 4,
    title: 'Avatar',
    year: 2009,
    genre: 'Fantasy',
    description:
      'A former Marine becomes involved in a conflict on Pandora, a beautiful alien world with a unique ecosystem.',
    image:
      'https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg',
  },
];

function MovieDetails() {
  const { id } = useParams();
  const movie = movieData.find((item) => item.id === Number(id));

  if (!movie) {
    return (
      <div style={{ padding: '40px', color: 'white' }}>
        <h2>Movie not found</h2>
        <Link to="/" style={{ color: '#ff4057' }}>
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 8%', color: 'white' }}>
      <Link to="/" className="back-link">
        ← Back to Home
      </Link>

      <div className="details-layout">
        <img
          src={movie.image}
          alt={movie.title}
          className="details-poster"
        />

        <div className="details-content">
          <h1>{movie.title}</h1>
          <p className="details-meta">
            {movie.year} • {movie.genre}
          </p>

          <h3>About the Movie</h3>
          <p className="details-description">{movie.description}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
