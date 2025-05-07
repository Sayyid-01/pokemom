

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../styles/PokeMonHome.css';
// import Navbar from '../Common/Navbar';

// const PokeMonHome = () => {
    
//     const [pokemons, setPokemons] = useState([]);
//     const [favorites, setFavorites] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [viewDetails, setViewDetails] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();
//     const [filteredPokemnons, setFilteredPokemon] = useState([])

//     const pokemonsPerPage = 20;
//     const totalPages = Math.ceil(150 / pokemonsPerPage);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 setLoading(true);
//                 const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
//                 const { results } = await res.json();

//                 const details = await Promise.all(
//                     results.map(async ({ url }) => {
//                         const res = await fetch(url);
//                         return res.json();
//                     })
//                 );

//                 const formattedData = details.map(p => ({
//                     id: p.id,
//                     name: p.name,
//                     types: p.types.map(t => t.type.name),
//                     sprite: p.sprites.front_default, // Changed to front_default for better visibility
//                     abilities: p.abilities.map(a => a.ability.name),
//                     moves: p.moves.map(m => m.move.name),
//                     stats: p.stats.map(s => ({ name: s.stat.name, value: s.base_stat }))
//                 }));

//                 setPokemons(formattedData);
//                 setData(formattedData);
//                 setLoading(false);
//             } catch (err) {
//                 console.error("Error fetching Pokémon data:", err);
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     useEffect(() => {
//         const stored = JSON.parse(localStorage.getItem("favorites")) || [];
//         setFavorites(stored);
//     }, []);

//     useEffect(() => {
//         localStorage.setItem("favorites", JSON.stringify(favorites));
//     }, [favorites]);

//     const handleViewDetails = (pokemon) => {
//         setViewDetails([pokemon]);
//         localStorage.setItem("viewDetails", JSON.stringify([pokemon]));
//         navigate("/pokemondetails");
//     };

//     const handleAddToFavorites = (pokemon) => {
//         if (!favorites.find(fav => fav.id === pokemon.id)) {
//             setFavorites(prev => [...prev, pokemon]);
//         }
//     };

//     const start = (currentPage - 1) * pokemonsPerPage;
//     const paginatedPokemons = pokemons.slice(start, start + pokemonsPerPage);



//     //funtion for search anf filter 

//     const getPoke = ()=>{
//         if(search){
//           let filteredPokes = pokemons.filter(pokemon => pokemon.name == search)
//           setPokemons(filteredPokes)
//         }else if(search == ""){
//           fetchData()
//         }
//         else{
//           alert("not found")
//         }
//       }
    
//       // const getPokeBySelect = ()=>{
//       //   let filteredPokes2 = pokemones.filter(pokemon => pokemon.types.map(type => type) == dropdown)
//       //   console.log(filteredPokes2)
//       //   setDropdown(filteredPokes2)
//       // }
    
//       const getPokeBySelect = () => {
//         let filteredPokes2 = pokemons.filter(pokemon =>
//           pokemon.types.includes(dropdown.toLowerCase())
//         );
//         setPokemons(filteredPokes2); // not setDropdown
//       };
    



//     // Function to render type badge with appropriate class
//     const renderTypeBadge = (type) => {
//         return (
//             <span key={type} className={`type-badge type-${type}`}>
//                 {type}
//             </span>
//         );
//     };

//     return (
//         <div className="pokemon-container">
//             {/* Header */}
//             <div className="pokemon-header">
//                 <h1>Pokémon Explorer</h1>
//             </div>

//             {/* Pagination Controls */}
//             <div className="pagination-controls">
//                 <button
//                     onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                     disabled={currentPage === 1}
//                     className="pagination-button prev"
//                 >
//                     Previous
//                 </button>

//                 <span className="page-indicator">
//                     {currentPage} / {totalPages}
//                 </span>

//                 <button
//                     onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                     disabled={currentPage === totalPages}
//                     className="pagination-button next"
//                 >
//                     Next
//                 </button>
//             </div>

//             {/* Loading State */}
//             {loading ? (
//                 <div className="text-center py-10">
//                     <p className="text-xl text-indigo-600">Loading Pokémon data...</p>
//                 </div>
//             ) : (
//                 /* Pokémon Grid */
//                 <div className="pokemon-grid">
//                     {paginatedPokemons.map(pokemon => (
//                         <div key={pokemon.id} className="pokemon-card">
//                             <div className="card-header">
//                                 <span className="pokemon-id">#{pokemon.id.toString().padStart(3, '0')}</span>
//                                 <h3 className="pokemon-name">{pokemon.name}</h3>
//                             </div>

//                             <div className="card-image">
//                                 <img
//                                     src={pokemon.sprite}
//                                     alt={pokemon.name}
//                                     className="pokemon-image"
//                                 />
//                             </div>

//                             <div className="card-info">
//                                 <div className="pokemon-types">
//                                     {pokemon.types.map(type => renderTypeBadge(type))}
//                                 </div>
//                             </div>

//                             <div className="card-actions">
//                                 <button
//                                     onClick={() => handleAddToFavorites(pokemon)}
//                                     className="action-button favorite-button"
//                                 >
//                                     Favorite
//                                 </button>

//                                 <button
//                                     onClick={() => handleViewDetails(pokemon)}
//                                     className="action-button details-button"
//                                 >
//                                     Details
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default PokeMonHome;



import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PokeMonHome.css';
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
