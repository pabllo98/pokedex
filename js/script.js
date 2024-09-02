const pokemonName = document.querySelector('.pokemon_name')
const pokemonNumero = document.querySelector('.pokemon_number')
const pokemonImage = document.querySelector('.pokemon-image')

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const botaoVoltar = document.querySelector('.botaoVoltar');
const botaoProximo = document.querySelector('.botaoProximo')

let searchPokemon = 1;
const fetchPokemon = async(pokemon) => {
          const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
          if(APIResponse.status===200) {
            const data = await APIResponse.json();
            return data;
          }
}
   // renderizar pokemon
const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumero.innerHTML = '';

    const data = await fetchPokemon(pokemon);
    if(data) {
       pokemonImage.style.display = 'block';
       pokemonName.innerHTML = data.name;
       pokemonNumero.innerHTML = data.id;
       pokemonImage.src = data ['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
       input.value = '';
       searchPokemon = data.id;
    } else {
      pokemonImage.style.display = 'none';
      pokemonName.innerHTML = 'Not found:c';
      pokemonNumero.innerHTML = '';
    }
}
form.addEventListener('submit', (event) => {
        event.preventDefault();
        renderPokemon(input.value.toLowerCase());
      });
botaoVoltar.addEventListener('click' ,() => {
    if(searchPokemon > 1) {
        searchPokemon -=1;
        renderPokemon(searchPokemon)
    }
})
botaoProximo.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
  });

renderPokemon(searchPokemon);
      
