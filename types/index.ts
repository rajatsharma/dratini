export interface Pokemon {
  name: string;
  url: string;
}

export interface PokeResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

export interface Sprites {
  front_default: string;
  other?: {
    "official-artwork"?: {
      front_default: string;
    };
  };
}

export interface Type {
  slot: number;
  type: { name: string; url: string; };
}

export interface Ability {
  ability: { name: string; url: string; };
  is_hidden: boolean;
  slot: number;
}

export interface Stat {
  base_stat: number;
  stat: { name: string; url: string; };
}

export interface Details {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: Sprites;
  types: Type[];
  abilities: Ability[];
  stats: Stat[];
  species: { url: string; };
}

export interface Species {
  flavor_text_entries: {
    flavor_text: string;
    language: { name: string; };
  }[];
}
