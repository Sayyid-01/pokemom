import React, { useState, useEffect } from 'react';

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleRemove = (itemToRemove) => {
    const updatedFavorites = favorites.filter(item => item.id !== itemToRemove.id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-indigo-600 text-center mb-10">
        Your Favorite <span className="text-purple-500">Pokémons</span>
      </h1>

      {favorites.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          You haven’t added any favorites yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {favorites.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition border border-gray-200 flex flex-col justify-between"
            >
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">ID: {item.id}</span>
                  <h2 className="text-lg font-semibold text-indigo-700 capitalize">
                    {item.name}
                  </h2>
                </div>

                <img
                  src={item.sprite}
                  alt={item.name}
                  className="w-full h-40 object-contain bg-gray-100 rounded-xl border"
                />
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-medium text-gray-900">Types:</span>{" "}
                  <span className="text-purple-500 font-semibold">{item.types.join(', ')}</span>
                </p>

                <button
                  onClick={() => handleRemove(item)}
                  className="w-full py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition"
                >

                  Remove  Favorites

                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorite;


