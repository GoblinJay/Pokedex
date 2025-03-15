// Grab the container
const poke_container = document.getElementById('poke-container');

// Johto Pokemon are #152–251
const start_id = 152;
const end_id = 251;

// Colors dictionary for background highlights
const colors = {
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#F5F5F5',
  fighting: '#E6E0D4',
  normal: '#F5F5F5'
};

const main_types = Object.keys(colors);

// Fetch all Johto Pokemon
async function fetchPokemons() {
  for (let i = start_id; i <= end_id; i++) {
    await getPokemon(i);
  }
}

// Fetch a single Pokemon
async function getPokemon(id) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  createPokemonCard(data);
}

// Create a new card
function createPokemonCard(pokemon) {
  // New div for the card
  const pokemonEl = document.createElement('div');
  pokemonEl.classList.add('pokemon');

  // Basic info
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const id = pokemon.id.toString().padStart(3, '0'); // e.g. "152" -> "152"

  // Determine the type from the array
  const poke_types = pokemon.types.map(type => type.type.name);
  const type = main_types.find(typeName => poke_types.indexOf(typeName) > -1);
  const color = colors[type];

  // Set background color based on type
  pokemonEl.style.backgroundColor = color;

  // Inner HTML
  const pokemonInnerHTML = `
    <div class="img-container">
      <img 
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" 
        alt="${name}"
      />
    </div>
    <div class="info">
      <span class="number">#${id}</span>
      <h3 class="name">${name}</h3>
      <small class="type">Type: <span>${type}</span></small>
    </div>
  `;

  pokemonEl.innerHTML = pokemonInnerHTML;
  poke_container.appendChild(pokemonEl);
}

// Go!
fetchPokemons();
