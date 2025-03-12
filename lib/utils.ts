export function getPokemonIdFromUrl(url: string): string {
  const parts = url.split('/');
  return parts[parts.length - 2];
}

export function getPokemonImageUrl(pokemon: { name: string; url: string }): string {
  const id = getPokemonIdFromUrl(pokemon.url);
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}
