
const pokemonsList = document.getElementById('pokemonsList');
const loadMorePokemon = document.getElementById('loadMoreButton');
const maxRecord = 1051;
const limit = 6;
let offset = 0;

function loadPokemonItems(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = [])=> {

        pokemonsList.innerHTML += pokemons.map((pokemon) => {
            return `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="datail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
        
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>
            `;

        }).join('');
    });
}

loadPokemonItems(offset, limit);

loadMorePokemon.addEventListener('click', () => {
    
    offset += limit;
    const qtdRecordNextPage = offset + limit;

    if(qtdRecordNextPage >= maxRecord){
        const newLimit = maxRecord - offset;
        loadPokemonItems(offset, newLimit);

        loadMorePokemon.parentElement.removeChild(loadMorePokemon);
    }else{
        loadPokemonItems(offset, limit);
    }

})