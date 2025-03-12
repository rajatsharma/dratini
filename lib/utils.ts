import { Pokemon, Details } from "@/types";

export function getPokemonIdFromUrl(url: string): string {
  const parts = url.split("/");
  return parts[parts.length - 2];
}

export function getPokemonImageUrl(pokemon: Pokemon | Details): string {
  if ("sprites" in pokemon && pokemon.sprites) {
    return (
      pokemon.sprites.other?.["official-artwork"]?.front_default ??
      pokemon.sprites.front_default
    );
  }

  const id = getPokemonIdFromUrl((pokemon as any).url);
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}
