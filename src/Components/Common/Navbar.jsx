




import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ onSearch, onFilter }) => {
  const [searchInput, setSearchInput] = useState('');
  const [selectedType, setSelectedType] = useState('');



  return (
    <div className="w-full flex justify-center bg-white shadow-md">
      <nav className="w-full container mx-auto px-4 py-4 flex flex-col lg:flex-row lg:justify-between gap-4 lg:gap-0 items-center">

        {/* Logo */}
        <h1 className="font-bold text-[24px] text-indigo-600">

          <Link to="/">PokeMon Explorer</Link>

          <button onClick={() => window.location.reload()}>PokeMon Explorer</button>

        </h1>

        {/* Search */}
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="px-4 py-2 border border-indigo-300 rounded-lg w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-indigo-400"
            type="text"
            placeholder="Search Pokémon"
          />
          <button
            onClick={() => onSearch(searchInput)}
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 w-full sm:w-auto transition"
          >
            Search
          </button>
        </div>

        {/* Filter */}
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-indigo-300 rounded-lg w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">All Types</option>
            <option value="grass">Grass</option>
            <option value="water">Water</option>
            <option value="fire">Fire</option>
            <option value="electric">Electric</option>
            <option value="bug">Bug</option>
            <option value="poison">Poison</option>
          </select>
          <button
            onClick={() => onFilter(selectedType)}
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 w-full sm:w-auto transition"
          >
            Filter
          </button>
        </div>

        {/* Favorites */}
        <Link
          to="/favorite"
          className="px-4 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-600 transition"
        >
          Favorites
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
