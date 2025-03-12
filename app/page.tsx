import PokeList from '@/components/PokeList';
import { PokeResponse, Pokemon } from '@/types';

const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon";

async function getPokemons(limit: number = 150): Promise<Pokemon[]> {
  try {
    const response = await fetch(`${POKEMON_API_URL}?limit=${limit}`);
    if (!response.ok) {
      throw new Error("Unable to fetch")
    }

    const data: PokeResponse = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching pokemons:", error);
    return [];
  }
}

export default async function HomePage() {
  const pokemons = await getPokemons(150);

  return (
    <main className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
        Dratini - Tiny Pokédex
      </h1>
      <PokeList pokemons={pokemons} />
    </main>
  );
}
