


// const fetchData = async () => {
//   try {
//     const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
//     const { results } = await response.json();

//     const pokemonDetails = await Promise.all(
//       results.map(async ({ url }) => {
//         const res = await fetch(url);
//         return res.json();
//       })
//     );

//     const allPokemones = pokemonDetails.map(pokemon => ({
//       name: pokemon.name,
//       id: pokemon.id,
//       types: pokemon.types.map(t => t.type.name),
//       sprites: pokemon.sprites.back_default,
//       ability: pokemon.abilities.map(a => a.ability.name),
//       moves: pokemon.moves.map(m => m.move.name),
//       stats: pokemon.stats.map(s => s.stat.name)
//     }));

//     setPokemones(allPokemones);
//   } catch (error) {
//     console.error("Failed to fetch Pokémon data:", error);
//   }
// };

// export default fetchData;
