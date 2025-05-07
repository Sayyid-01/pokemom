import React from 'react';



import { useNavigate } from 'react-router-dom';

const PokemonDetail = () => {
  const viewPokes = JSON.parse(localStorage.getItem("viewDetails")) || [];

  if (!viewPokes || viewPokes.length === 0) {
    return <div className="container mx-auto px-4 py-8">No Pokémon details found.</div>;
  }



  const navigate = useNavigate();

  return (
    <div>
      {viewPokes.map((data, index) => (
        <div key={index} className="container mx-auto px-4 py-8">
          <div className="bg-blue-400 rounded-2xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6">

            {/* Image Section */}
            <div className="w-full md:w-1/2">


              <button className='text-3xl text-blue-100 pb-2 mt-0' onClick={() => navigate(-1)}>x</button>

              <img
                src={data.sprite || "https://via.placeholder.com/150"} // ✅ Fixed
                alt={data.name}
                className="w-full h-auto object-contain rounded-xl border border-gray-300 bg-indigo-100"
              />
            </div>



            {/* Info Section */}
            <div className="w-full md:w-1/2 flex flex-col gap-2 text-gray-800">
              <h1 className="text-2xl font-bold">#{data.id} {data.name}</h1>

              <h2 className="text-lg font-semibold">Abilities:</h2>
              <p className="text-base">{data.abilities?.join(", ")}</p> {/* ✅ Changed */}

              <h2 className="text-lg font-semibold mt-2">Moves:</h2>
              <p className="text-base line-clamp-3">{data.moves?.slice(0, 10).join(", ")}</p> {/* ✅ Optional slice */}

              <h2 className="text-lg font-semibold mt-2">Stats:</h2>
              <p className="text-base">{data.stats?.join(", ")}</p> {/* ✅ Changed */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PokemonDetail;
