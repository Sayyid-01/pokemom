// import { Routes, Route } from 'react-router-dom'
// import PokeMonHome from './Components/Pages/Home'
// import Favorite from './Components/Pages/Favorite'
// import PokemonDetail from './Components/Pages/PokemonDetail'
// // import { createContext, useEffect, useState } from 'react';

// import React, { useState } from 'react';







// function App() {


 
//   return (
//     <>
//       {/* <PokemonContext value={allPokemones}> */}


//       <Routes>
//         {/* <Route path="/" element={<Navbar onSearch={handleSearch} onFilter={handleFilter} />} /> */}

//         <Route path="/" element={<PokeMonHome />} />
//         <Route path="/favorite" element={<Favorite />} />
//         <Route path="/pokemondetails" element={<PokemonDetail />} />
//       </Routes>
//       {/* </PokemonContext> */}
//     </>
//   )
// }

// export default App



import { Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import PokeMonHome from './Components/Pages/Home';
import Favorite from './Components/Pages/Favorite';
import PokemonDetail from './Components/Pages/PokemonDetail';

function App() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllPokemons = async () => {
    setLoading(true);
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
    const { results } = await res.json();

    const details = await Promise.all(
      results.map(async ({ url }) => {
        const res = await fetch(url);
        return res.json();
      })
    );

    const formattedData = details.map(p => ({
      id: p.id,
      name: p.name,
      types: p.types.map(t => t.type.name),
      sprite: p.sprites.front_default,
      abilities: p.abilities.map(a => a.ability.name),
      moves: p.moves.map(m => m.move.name),
      stats: p.stats.map(s => ({ name: s.stat.name, value: s.base_stat }))
    }));

    setAllPokemons(formattedData);
    setFilteredPokemons(formattedData);
    setLoading(false);
  };

  useEffect(() => {
    fetchAllPokemons();
  }, []);

  const handleSearch = (searchTerm) => {
    const result = allPokemons.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPokemons(result.length ? result : []);
  };

  const handleFilter = (type) => {
    if (!type) return setFilteredPokemons(allPokemons);
    const result = allPokemons.filter(p =>
      p.types.includes(type.toLowerCase())
    );
    setFilteredPokemons(result);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PokeMonHome
            pokemons={filteredPokemons}
            loading={loading}
            onSearch={handleSearch}
            onFilter={handleFilter}
          />
        }
      />
      <Route path="/favorite" element={<Favorite />} />
      <Route path="/pokemondetails" element={<PokemonDetail />} />
    </Routes>
  );
}

export default App;
