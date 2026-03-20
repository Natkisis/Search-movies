import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import './FavoritesPage.css';

export default function FavoritesPage() {
  const { favorites, removeFromFavorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="favorites-page">
        <h1>⭐ Favorite films</h1>
        <p className="empty-favorites">You do not have any favorites movies yet</p>
        <Link to="/" className="back-link">← Back to the search</Link>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <h1>⭐ Favorite films ({favorites.length})</h1>
      
      <div className="favorites-grid">
        {favorites.map((movie) => (
          <div key={movie.imdbID} className="favorite-item">
            <Link to={`/movie/${movie.imdbID}`} className="movie-link">
              <img 
                src={movie.Poster !== 'N/A' ? movie.Poster : '/no-poster.jpg'} 
                alt={movie.Title}
              />
              <h3>{movie.Title} ({movie.Year})</h3>
            </Link>
            <button 
              className="remove-favorite"
              onClick={() => removeFromFavorites(movie.imdbID)}
            >
              ✕ Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}