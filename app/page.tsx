import PokemonList from "@/components/PokeList";
import SearchComponent from "@/components/PokeSearch";
import { Pokemon, PokeResponse } from "@/types";
import { Suspense } from "react";

const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon";

async function getPokemons(limit: number = 150): Promise<Pokemon[]> {
  try {
    const response = await fetch(`${POKEMON_API_URL}?limit=${limit}`, {
      cache: "force-cache",
    });

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

type SearchParams = Promise<{ q: string }>;

export default async function HomePage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const allPokemons = await getPokemons(150);
  const awaitedSearchParams = await searchParams;
  const searchQuery = awaitedSearchParams?.q?.toLowerCase() ?? "";

  const filteredPokemons = searchQuery
    ? allPokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery),
      )
    : allPokemons;

  return (
    <main className="container mx-auto px-4 py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-2">
        <span className="bg-gradient-to-r from-indigo-600 to-teal-500 text-transparent bg-clip-text">
          Pokédex
        </span>
      </h1>

      {/* Client boundary */}
      <Suspense fallback={"Loading..."}>
        <SearchComponent initialSearch={searchQuery} />
      </Suspense>

      <PokemonList pokemons={filteredPokemons} />
    </main>
  );
}
