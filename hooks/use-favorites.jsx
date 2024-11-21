import { useState, useEffect, useCallback } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = useCallback(() => {
    const storedFavorites = localStorage.getItem('documentFavorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    loadFavorites();

    const handleFavoritesUpdate = (e) => {
      loadFavorites();
    };

    window.addEventListener('documentFavoritesUpdated', handleFavoritesUpdate);

    const handleStorageChange = (e) => {
      if (e.key === 'documentFavorites') {
        loadFavorites();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('documentFavoritesUpdated', handleFavoritesUpdate);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [loadFavorites]);

  const addToFavorites = (doc) => {
    const updatedFavorites = [...favorites, doc];
    setFavorites(updatedFavorites);
    localStorage.setItem('documentFavorites', JSON.stringify(updatedFavorites));
    
    window.dispatchEvent(new CustomEvent('documentFavoritesUpdated'));
  };

  const removeFromFavorites = (docId) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== docId);
    setFavorites(updatedFavorites);
    localStorage.setItem('documentFavorites', JSON.stringify(updatedFavorites));
    
    window.dispatchEvent(new CustomEvent('documentFavoritesUpdated'));
  };

  const isFavorite = (docId) => {
    return favorites.some(fav => fav.id === docId);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  };
}