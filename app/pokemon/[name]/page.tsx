import Image from "next/image";
import Link from "next/link";
import { Details, Species } from "@/types";
import { getPokemonImage } from "@/lib/utils";

const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon";

async function getPokemonDetails(name: string): Promise<Details | null> {
  const response = await fetch(`${POKEMON_API_URL}/${name.toLowerCase()}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch pokemon details`);
  }

  return response.json();
}

async function getPokemonSpeciesDetails(url: string): Promise<Species | null> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch species details from ${url}`);
  }

  return await response.json();
}

export async function generateStaticParams(): Promise<{ name: string }[]> {
  const response = await fetch(`${POKEMON_API_URL}?limit=150`);
  const data = await response.json();
  return data.results.map((pokemon: { name: string }) => ({
    name: pokemon.name,
  }));
}

type Params = Promise<{ name: string }>;

export default async function PokemonDetailPage({
  params,
}: {
  params: Params;
}) {
  const awaitedParams = await params;
  const pokemon = await getPokemonDetails(awaitedParams.name);

  if (!pokemon) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold">Pokémon not found.</h1>
        <Link
          href="/"
          className="text-amber-500 hover:underline mt-4 inline-block"
        >
          Back to list
        </Link>
      </div>
    );
  }

  const speciesData = pokemon.species?.url
    ? await getPokemonSpeciesDetails(pokemon.species.url)
    : null;

  const flavorTextEntry = speciesData?.flavor_text_entries.find(
    (entry) => entry.language.name === "en",
  );

  const flavorText =
    flavorTextEntry?.flavor_text.replace(/[\n\f\r]/g, " ") ??
    "No description available.";

  const imageUrl = getPokemonImage(pokemon.id);
  const primaryType = pokemon.types[0].type.name.toLowerCase();

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Link
        href="/"
        className="text-amber-500 hover:underline mb-6 inline-block dark:text-amber-400"
      >
        ← Back to Pokédex
      </Link>
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8">
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <div
              className={`relative w-48 h-48 md:w-64 md:h-64 border rounded-md bg-gray-100 dark:bg-gray-700 dark:border-gray-600 type-${primaryType}`}
            >
              <Image
                src={imageUrl}
                alt={pokemon.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-contain p-2"
                priority
              />
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold capitalize mb-2 text-gray-800 dark:text-gray-100">
              {pokemon.name}
              <span className="text-2xl text-gray-500 dark:text-gray-400 ml-2">
                #{String(pokemon.id).padStart(3, "0")}
              </span>
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4 italic">
              {flavorText}
            </p>

            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-1 text-gray-700 dark:text-gray-200">
                Types
              </h2>
              <div className="flex gap-2">
                {pokemon.types.map((typeInfo) => (
                  <span
                    key={typeInfo.type.name}
                    className={`px-3 py-1 text-sm font-medium rounded-full text-white type-${typeInfo.type.name.toLowerCase()}`}
                  >
                    {typeInfo.type.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                  Height
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {(pokemon.height / 10).toFixed(1)} m
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                  Weight
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {(pokemon.weight / 10).toFixed(1)} kg
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          {pokemon.stats.map((statInfo) => (
            <div key={statInfo.stat.name} className="mb-2">
              <div className="flex justify-between text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                <span className="uppercase">
                  {statInfo.stat.name.replace("-", " ")}
                </span>
                <span>{statInfo.base_stat}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className={`type-${primaryType} h-2.5 rounded-full`}
                  style={{
                    width: `${Math.min(statInfo.base_stat, 150) / 1.5}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-200">
            Abilities
          </h2>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
            {pokemon.abilities.map((abilityInfo) => (
              <li key={abilityInfo.ability.name} className="capitalize">
                {abilityInfo.ability.name.replace("-", " ")}
                {abilityInfo.is_hidden && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {" "}
                    (Hidden)
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: { params: Params }) {
  const awaitedParams = await params;
  const pokemonName =
    awaitedParams.name.charAt(0).toUpperCase() + awaitedParams.name.slice(1);

  return {
    title: `${pokemonName} | Pokémon Details`,
    description: `Details for Pokémon ${pokemonName}`,
  };
}
