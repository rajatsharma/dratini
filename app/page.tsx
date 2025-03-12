import PokemonList from "@/components/PokeList";
import SearchComponent from "@/components/PokeSearch";
import { Pokemon, PokeResponse } from "@/types";

const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon";

async function getPokemons(limit: number = 150): Promise<Pokemon[]> {
  try {
    const response = await fetch(`${POKEMON_API_URL}?limit=${limit}`);
    if (!response.ok) {
      throw new Error("Unable to fetch");
    }

    const data: PokeResponse = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching pokemons:", error);
    return [];
  }
}

export default async function HomePage({
  searchParams,
}: {
  searchParams?: { q?: string };
}) {
  const allPokemons = await getPokemons(150);
  const searchQuery = searchParams?.q?.toLowerCase() || "";

  const filteredPokemons = searchQuery
    ? allPokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery),
      )
    : allPokemons;

  return (
    <main className="container mx-auto px-4 py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-600 dark:text-blue-400">
        Dratini
      </h1>

      {/* Client boundary */}
      <SearchComponent initialSearch={searchQuery} />

      <PokemonList pokemons={filteredPokemons} />
    </main>
  );
}
