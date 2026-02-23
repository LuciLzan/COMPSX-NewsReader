import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext.jsx';

const ArticlesContext = createContext();

export function ArticlesProvider({ children }) {
  const { user, isAuthenticated } = useAuth();


  const [savedArticles, setSavedArticles] = useState({});

  const getUserSavedArticles = () => {
    if (!isAuthenticated || !user?.username) return [];
    return savedArticles[user.username] || [];
  };

  const saveArticle = (article) => {
    if (!isAuthenticated || !user?.username) return;

    setSavedArticles(prev => {
      const userArticles = prev[user.username] || [];

      // Check if article is already saved
      if (userArticles.find(a => a.url === article.url)) {
        return prev;
      }

      return {
        ...prev,
        [user.username]: [...userArticles, article]
      };
    });
  };

  const removeArticle = (url) => {
    if (!isAuthenticated || !user?.username) return;

    setSavedArticles(prev => {
      const userArticles = prev[user.username] || [];
      return {
        ...prev,
        [user.username]: userArticles.filter(a => a.url !== url)
      };
    });
  };

  const isArticleSaved = (url) => {
    if (!isAuthenticated || !user?.username) return false;

    const userArticles = savedArticles[user.username] || [];
    return userArticles.some(a => a.url === url);
  };

  return (
      <ArticlesContext.Provider
          value={{
            savedArticles,
            saveArticle,
            removeArticle,
            isArticleSaved,
            getUserSavedArticles
          }}
      >
        {children}
      </ArticlesContext.Provider>
  );
};

export const useArticles = () => {
  const context = useContext(ArticlesContext);
  if (!context) {
    throw new Error('useArticles must be used within ArticlesProvider');
  }
  return context;
};