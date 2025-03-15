// 1. Grab the container in our HTML
const poke_container = document.getElementById('poke-container');

// 2. Decide how many pokemon to fetch
//    Kanto Pokemon are #1 to #151
const pokemon_count = 151;

// 3. Colors dictionary for background highlights
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

// 4. For easy identification
const main_types = Object.keys(colors);

// 5. Fetch all Kanto Pokemon
async function fetchPokemons() {
  for (let i = 1; i <= pokemon_count; i++) {
    await getPokemon(i);
  }
}

// 6. Fetch a single Pokemon by ID
async function getPokemon(id) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  createPokemonCard(data);
}

// 7. Create a new card in HTML to display a single Pokemon
function createPokemonCard(pokemon) {
  // Create a div for the card
  const pokemonEl = document.createElement('div');
  pokemonEl.classList.add('pokemon');

  // Pull out the needed data
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const id = pokemon.id.toString().padStart(3, '0'); // e.g. "007"
  
  // The Pokemon API “types” array
  const poke_types = pokemon.types.map(type => type.type.name);
  const type = main_types.find(typeName => poke_types.indexOf(typeName) > -1);
  
  // Set card color based on type
  const color = colors[type];
  pokemonEl.style.backgroundColor = color;

  // Build the card’s inner HTML
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

// 8. Start everything
fetchPokemons();
