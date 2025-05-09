import Link from "next/link";
import Image from "next/image";
import { Pokemon } from "@/types";
import { getPokemonImage } from "@/lib/utils";

interface PokemonListProps {
  pokemons: Pokemon[];
}

export default function PokemonList({ pokemons }: PokemonListProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {pokemons.map((pokemon) => {
        const imageUrl = getPokemonImage(pokemon.url);

        return (
          <Link
            href={`/pokemon/${pokemon.name}`}
            key={pokemon.name}
            prefetch
            className="group border rounded-lg shadow-md p-4 flex flex-col items-center bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
          >
            <div className="relative w-32 h-32 mb-2">
              <Image
                src={imageUrl}
                alt={pokemon.name}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                className="object-contain group-hover:scale-105 transition-transform"
                priority={pokemons.indexOf(pokemon) < 12}
                fetchPriority={pokemons.indexOf(pokemon) < 12 ? "high" : "auto"}
              />
            </div>
            <h2 className="text-lg font-semibold capitalize text-center text-gray-800 dark:text-gray-100">
              {pokemon.name}
            </h2>
          </Link>
        );
      })}
    </div>
  );
}
