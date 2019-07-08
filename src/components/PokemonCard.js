import React from 'react'
import { Card } from 'semantic-ui-react'

const PokemonCard = ({pokemon, toggleImage}) => {
	const {name, stats, sprites, onFront} = pokemon
	const url = onFront ? sprites.front : sprites.back
	const hp = stats.find(s => s.name === 'hp').value

	const clickPoke = () => toggleImage(pokemon)

	return (
		<Card onClick={clickPoke}>
			<div>
				<div className="image">
					<img src={url} alt="oh no!" />
				</div>
				<div className="content">
					<div className="header">{name}</div>
				</div>
				<div className="extra content">
					<span>
						<i className="icon heartbeat red" />
						{hp} hp
					</span>
				</div>
			</div>
		</Card>
	)
}

export default PokemonCard
