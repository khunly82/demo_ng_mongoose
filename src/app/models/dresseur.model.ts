export interface Dresseur {
  id: string;
  nom: string;
  age: number;
  pokemons: DresseurPokemon[];
}

export interface DresseurPokemon {
  nom: string;
  niveau: number;
  raceNumero: number;
  raceNom: string;
}
