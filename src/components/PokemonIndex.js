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
      searchTerm: ""
    }
  }

  componentDidMount() {
    this.loadPokemons()
  }

  loadPokemons = () => {
    fetch('http://localhost:3000/pokemon')
    .then(res => res.json())
    .then(pokemons => {
      pokemons.map(pokemon => pokemon.onFront = true)
      this.setState({pokemons: pokemons})
    })
  }

  toggleImage = pokemon => {
    this.setState(prevState => prevState.pokemons.map(poke => {
      if (poke === pokemon) {poke.onFront = !poke.onFront}
    }))
  }

  handleSearchChange = (ev, {value}) => {
    this.setState({searchTerm: value})
  }
  
  addPokemon = pokemon => {
    console.log(pokemon)
    this.setState(prevState => ({
      pokemons: [...prevState.pokemons, pokemon]
    }));
  };


  render() {
    const filtered = this.state.pokemons.filter(p =>
      p.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    )
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={_.debounce(this.handleSearchChange, 500)} showNoResults={false} />
        <br />
        <PokemonForm onSubmitForm={this.handleSubmit} addPokemon={this.addPokemon} />
        <br />
        <PokemonCollection pokemons={filtered} toggleImage={this.toggleImage} />
      </div>
    )
  }
}

export default PokemonPage
