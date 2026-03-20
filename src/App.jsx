import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { searchMovies } from './api';
import MoviePage from './pages/MoviePage';
import FavoritesPage from './pages/FavoritesPage'; 
import { useFavorites } from './context/FavoritesContext'; 
import './App.css';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const { favorites } = useFavorites(); 

  async function handleSearch(e) {
    e.preventDefault();
    if (!search.trim()) return;

    setLoading(true);
    const results = await searchMovies(search);
    setMovies(results);
    setLoading(false);
  }

  return (
    <>
      <nav className="nav-bar">
        <Link to="/" className="nav-link">Search</Link>
        <Link to="/favorites" className="nav-link">
          Favorite {favorites.length > 0 && `(${favorites.length})`}
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={
          <div className="app">
            <h1>🎬 Movie search</h1>
            <h2>Please write in English</h2>

            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Find a movie ..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type="submit">Search</button>
            </form>

            {loading && <p>Loading...</p>}

            <div className="movies">
              {movies.map((movie) => (
                <Link
                  to={`/movie/${movie.imdbID}`}
                  key={movie.imdbID}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div className="movie-card">
                    <img
                      src={movie.Poster !== 'N/A' ? movie.Poster : '/no-poster.jpg'}
                      alt={movie.Title}
                    />
                    <h3>{movie.Title} ({movie.Year})</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        } />

        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/favorites" element={<FavoritesPage />} /> 
      </Routes>
    </>
  );
}

