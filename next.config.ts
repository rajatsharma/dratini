import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    scrollRestoration: true,
  },
  images: {
    remotePatterns: [
      new URL(
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/**",
      ),
    ],
  },
};

export default nextConfig;
