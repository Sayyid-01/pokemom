

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pokeMonHome.css';
import Navbar from '../Common/Navbar';

const PokeMonHome = ({ pokemons, loading, onSearch, onFilter }) => {
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleViewDetails = (pokemon) => {
    localStorage.setItem("viewDetails", JSON.stringify([pokemon]));
    navigate("/pokemondetails");
  };

  const handleAddToFavorites = (pokemon) => {
    if (!favorites.find(fav => fav.id === pokemon.id)) {
      setFavorites(prev => [...prev, pokemon]);
    }
  };

  const pokemonsPerPage = 20;
  const totalPages = Math.ceil(pokemons.length / pokemonsPerPage);
  const start = (currentPage - 1) * pokemonsPerPage;
  const paginatedPokemons = pokemons.slice(start, start + pokemonsPerPage);

  const renderTypeBadge = (type) => (
    <span key={type} className={`type-badge type-${type}`}>
      {type}
    </span>
  );

  return (
    <div className="pokemon-container">
      <Navbar onSearch={onSearch} onFilter={onFilter} />

      {/* Pagination */}
      <div className="pagination-controls">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="pagination-button prev"
        >
          Previous
        </button>
        <span className="page-indicator">{currentPage} / {totalPages}</span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="pagination-button next"
        >
          Next
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-10">
          <p className="text-xl text-indigo-600">Loading Pokémon data...</p>
        </div>
      ) : (
        <div className="pokemon-grid">
          {paginatedPokemons.map(pokemon => (
            <div key={pokemon.id} className="pokemon-card">
              <div className="card-header">
                <span className="pokemon-id">#{pokemon.id.toString().padStart(3, '0')}</span>
                <h3 className="pokemon-name">{pokemon.name}</h3>
              </div>
              <div className="card-image">
                <img src={pokemon.sprite} alt={pokemon.name} className="pokemon-image" />
              </div>
              <div className="card-info">
                <div className="pokemon-types">
                  {pokemon.types.map(renderTypeBadge)}
                </div>
              </div>
              <div className="card-actions">
                <button onClick={() => handleAddToFavorites(pokemon)} className="action-button favorite-button">
                  Favorite
                </button>
                <button onClick={() => handleViewDetails(pokemon)} className="action-button details-button">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PokeMonHome;
