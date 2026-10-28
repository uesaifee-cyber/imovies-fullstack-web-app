import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Home() {
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/movies')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        return response.json();
      })
      .then((data) => setMovies(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesGenre =
        selectedGenre === 'All' || movie.genre === selectedGenre;

    return matchesSearch && matchesGenre;
  });

  if (loading) {
    return <h2>Loading movies...</h2>;
  }

  if (error) {
    return <h2>{error}. Please check whether your backend is running.</h2>;
  }

  return (
    <div className="home">
      <h1>🎬 IMovies</h1>
      <p>Discover your next favourite movie!</p>

      <input
        type="text"
        placeholder="Search movies by title..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className="movie-search"
      />

      <select
        value={selectedGenre}
        onChange={(event) => setSelectedGenre(event.target.value)}
        className="genre-filter"
      >
        <option value="All">All Genres</option>
        <option value="Action">Action</option>
        <option value="Sci-Fi">Sci-Fi</option>
        <option value="Adventure">Adventure</option>
        <option value="Fantasy">Fantasy</option>
      </select>

      <div className="movie-container">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <Link
              to={`/movie/${movie.id}`}
              className="movie-card"
              key={movie.id}
            >
              <img src={movie.image} alt={movie.title} />
              <h3>{movie.title}</h3>
              <p>{movie.year}</p>
              <p>{movie.genre}</p>
            </Link>
          ))
        ) : (
          <p>No movies found. Try another title!</p>
        )}
      </div>
    </div>
  );
}

export default Home;