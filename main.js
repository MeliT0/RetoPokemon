function searchPokemon() {
  const inputElement = document.getElementById('pokemonInput');
  const pokemonName = inputElement.value.toLowerCase();

  if (pokemonName.trim() === '') {
      alert('Por favor, ingrese el nombre del Pokémon');
      return;
  }

  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then(response => {
          if (!response.ok) {
              throw new Error('Pokémon no encontrado');
          }
          return response.json();
      })
      .then(data => {
          displayPokemonDetails(data);
      })
      .catch(error => {
          displayErrorMessage(error.message);
      });
}

function displayPokemonDetails(pokemon) {
  const detailsElement = document.getElementById('pokemonDetails');
  detailsElement.innerHTML = `
      <h2>${pokemon.name}</h2>
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
      <p>Tipo(s): ${pokemon.types.map(type => type.type.name).join(', ')}</p>
  `;
}

function displayErrorMessage(message) {
  const detailsElement = document.getElementById('pokemonDetails');
  detailsElement.innerHTML = `<p style="color: red;">${message}</p>`;
}