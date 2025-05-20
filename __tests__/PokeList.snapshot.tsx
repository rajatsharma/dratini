import { render } from "@testing-library/react";
import PokemonList from "@/components/PokeList";

it("renders Pokélist unchanged", () => {
  const { container } = render(
    <PokemonList
      pokemons={[
        { name: "Mew", url: "https://pokeapi.co/api/v2/pokemon/151/" },
      ]}
    />,
  );

  expect(container).toMatchSnapshot();
});
