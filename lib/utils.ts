export function getPokemonImage(id: number): string;
export function getPokemonImage(url: string): string;
export function getPokemonImage(idOrUrl: number | string): string {
  if (typeof idOrUrl === "string") {
    const parts = idOrUrl.split("/");
    const id = parts[parts.length - 2];
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }

  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${idOrUrl}.png`;
}
