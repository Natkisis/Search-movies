import { createContext, useState, useContext, useEffect } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // downloading favorites from localStorage 
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // saving to localStorage when changing
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (movie) => {
    setFavorites(prev => {
      // checking if there is already such a movie
      if (prev.some(m => m.imdbID === movie.imdbID)) {
        return prev;
      }
      return [...prev, movie];
    });
  };

  const removeFromFavorites = (movieId) => {
    setFavorites(prev => prev.filter(movie => movie.imdbID !== movieId));
  };

  const isFavorite = (movieId) => {
    return favorites.some(movie => movie.imdbID === movieId);
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite
    }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
}