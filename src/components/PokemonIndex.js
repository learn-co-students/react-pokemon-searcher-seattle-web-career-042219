import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {

  constructor() {
    super()
    this.state = {
      pokemons: [],
    }
    this.loadPokemons()
  }

  loadPokemons = () => {
    fetch("http://localhost:3000/pokemon")
    .then(resp => resp.json())
    .then(data => {
      data.map(pokemon => (pokemon.visible = true ))
      this.setState({ pokemons: data })
    })
  }

  searchPokemons = (event, data) => {
    this.setState(prevState => {
      const tempCopyOfPokemonList = prevState.pokemons.slice()
      tempCopyOfPokemonList.map(thisPokemon => {
        thisPokemon.visible = thisPokemon.name.includes(data.value)
      })
      return {
        pokemons: tempCopyOfPokemonList
      }
    })
  }

  addPokemon = newPokemon => {
    console.log(newPokemon)
  }

  

  render() {  
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={_.debounce(this.searchPokemons, 500)}
        showNoResults={false} />
        <br />
        <PokemonCollection pokemons={this.state.pokemons}/>
        <br />
        <PokemonForm onAddPokemon={this.addPokemon} />
      </div>
    )
  }
}

export default PokemonPage
