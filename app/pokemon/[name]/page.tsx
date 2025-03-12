import Image from 'next/image';
import Link from 'next/link';
import { Details, Species } from '@/types';
import { getPokemonImageUrl } from '@/lib/utils';

const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon";

async function getPokemonDetails(name: string): Promise<Details | null> {
  try {
    const res = await fetch(`${POKEMON_API_URL}/${name.toLowerCase()}`);
    if (!res.ok) return null;
    return res.json();
  } catch (error) { console.error(error); return null; }
}

async function getPokemonSpeciesDetails(url: string): Promise<Species | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return res.json();
  } catch (error) { console.error(error); return null; }
}

export async function generateStaticParams() {
  const response = await fetch(`${POKEMON_API_URL}?limit=150`);
  const data = await response.json();
  return data.results.map((p: { name: string }) => ({ name: p.name }));
}

export async function generateMetadata({ params }: { params: { name: string } }) {
  const name = params.name.charAt(0).toUpperCase() + params.name.slice(1);
  return { title: `${name} | Pokémon Details` };
}

export default async function PokemonDetailPage({ params }: { params: { name: string } }) {
  const pokemon = await getPokemonDetails(params.name);

  if (!pokemon) {
    return <div className="container mx-auto p-4 text-center">Pokémon not found.</div>;
  }

  const speciesData = pokemon.species?.url ? await getPokemonSpeciesDetails(pokemon.species.url) : null;
  const flavorText = speciesData?.flavor_text_entries.find(ft => ft.language.name === 'en')?.flavor_text.replace(/[\n\f\r]/g, ' ') || "No description available.";
  const imageUrl = getPokemonImageUrl(pokemon);

  return (
    <div className="container mx-auto p-4 sm:p-8 bg-gray-50 min-h-screen">
      <Link href="/" className="text-blue-500 hover:underline mb-6 inline-block">← Back</Link>
      <div className="bg-white shadow-xl rounded-lg p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="text-center md:text-left">
            <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto border rounded-md bg-gray-100">
              <Image src={imageUrl} alt={pokemon.name} fill className="object-contain p-2" priority />
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold capitalize mb-1 text-gray-800">{pokemon.name} <span className="text-2xl text-gray-500">#{String(pokemon.id).padStart(3, '0')}</span></h1>
            <p className="text-lg text-gray-600 mb-4 italic">{flavorText}</p>
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-1 text-gray-700">Types</h2>
              <div className="flex gap-2">
                {pokemon.types.map(t => <span key={t.type.name} className={`px-3 py-1 text-sm rounded-full text-white bg-gray-400 type-${t.type.name}`}>{t.type.name}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
