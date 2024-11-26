import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@clerk/nextjs';

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);
  const { userId } = useAuth();

  const getFavoritesKey = useCallback(() => {
    return `documentFavorites_${userId}`;
  }, [userId]);

  const loadFavorites = useCallback(() => {
    if (!userId) return; 

    const storedFavorites = localStorage.getItem(getFavoritesKey());
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    } else {
      setFavorites([]);
    }
  }, [userId, getFavoritesKey]);

  useEffect(() => {
    if (userId) {
      loadFavorites();
    } else {
      setFavorites([]); 
    }

    const handleFavoritesUpdate = (e) => {
      if (e.detail?.userId === userId) {
        loadFavorites();
      }
    };

    window.addEventListener('documentFavoritesUpdated', handleFavoritesUpdate);

    const handleStorageChange = (e) => {
      if (e.key === getFavoritesKey()) {
        loadFavorites();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('documentFavoritesUpdated', handleFavoritesUpdate);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [userId, loadFavorites, getFavoritesKey]);

  const addToFavorites = (doc) => {
    if (!userId) return; 

    const updatedFavorites = [...favorites, doc];
    setFavorites(updatedFavorites);
    localStorage.setItem(getFavoritesKey(), JSON.stringify(updatedFavorites));
    
    window.dispatchEvent(new CustomEvent('documentFavoritesUpdated', {
      detail: { userId }
    }));
  };

  const removeFromFavorites = (docId) => {
    if (!userId) return; 

    const updatedFavorites = favorites.filter(fav => fav.id !== docId);
    setFavorites(updatedFavorites);
    localStorage.setItem(getFavoritesKey(), JSON.stringify(updatedFavorites));
    
    window.dispatchEvent(new CustomEvent('documentFavoritesUpdated', {
      detail: { userId }
    }));
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