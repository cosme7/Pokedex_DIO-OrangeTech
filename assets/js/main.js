const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img class="poke_img" src="${pokemon.photo}" alt="${pokemon.name}" title="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        loadMoreButton.classList.add('load_opacity')
        loadMoreButton.setAttribute('disabled', 'disabled')
    } else {
        loadPokemonItens(offset, limit)
        loadMoreButton.classList.remove('load_opacity')
        loadMoreButton.removeAttribute('disabled')
    }
})

// TENTATIVA FRUSTADA DE IMPLEMENTAR UM MODAL //

// const modal = document.querySelector(".modal")
// const openModal = document.querySelector(".open_modal")
// const closeModal = document.querySelector(".close_modal")

// openModal.addEventListener('click', () => {
//     modal.showModal()
// });
  
// closeModal.addEventListener('click', () => {
//     modal.close()
// });

// function pokeModal (pokemon){
//     return `
//         <button class="open_modal">More Info</button>
//         <dialog class="modal">
//             <h2 class="nome">TESTE</h2>
//             <button class="close_modal">Close</button>
//         </dialog>
//     `
// }