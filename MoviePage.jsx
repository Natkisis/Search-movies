import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import './MoviePage.css';

export default function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  useEffect(() => {
    async function fetchMovie() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&i=${id}&plot=full`
        );
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Movie download error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [id]);

  const handleFavoriteClick = () => {
    if (isFavorite(movie.imdbID)) {
      removeFromFavorites(movie.imdbID);
    } else {
      addToFavorites(movie);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!movie) return <div className="error">The movie not found</div>;

  return (
    <div className="movie-page">
      <button onClick={() => window.history.back()}>← Back</button>

      <div className="movie-details">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : '/no-poster.jpg'}
          alt={movie.Title}
        />

        <div className="info">
          <div className="header-with-favorite">
            <h1>{movie.Title} ({movie.Year})</h1>
            <button
              className={`favorite-btn ${isFavorite(movie.imdbID) ? 'active' : ''}`}
              onClick={handleFavoriteClick}
            >
              {isFavorite(movie.imdbID) ? '★ In favorites' : '☆ To favorites'}
            </button>
          </div>

          <div className="meta">
            <span>⭐ {movie.imdbRating}</span>
            <span>⏱ {movie.Runtime}</span>
            <span>🎬 {movie.Genre}</span>
          </div>

          <p className="plot">{movie.Plot}</p>

          <div className="details">
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>Actors:</strong> {movie.Actors}</p>
            <p><strong>Country:</strong> {movie.Country}</p>
            <p><strong>Language:</strong> {movie.Language}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

