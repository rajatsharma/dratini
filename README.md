# Kantō Pokédex

A Next.js 15 App Router application to browse and search the Kantō region Pokémon, built with React Server Components, and Tailwind CSS.

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **UI Library:** [React 19](https://reactjs.org/) (with Server Components)
- **Styling:** Tailwind CSS
- **Data Source:** [PokeAPI](https://pokeapi.co/)

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.17 or later recommended)
- [pnpm](https://pnpm.io/)

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/rajatsharma/dratini.git
    cd dratini
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Run the development server:**

    ```bash
    pnpm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📂 Project Structure

```shell
dratini/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page (Pokémon list)
│   ├── pokemon/
│   │   └── [name]/
│   │       └── page.tsx        # Pokémon detail page
│   └── globals.css             # Global styles
├── components/
│   ├── PokeList.tsx            # Server Component for listing Pokémon
│   └── PokeSearch.tsx          # Client Component for search
├── lib/
│   └── utils.ts                # Utility functions
└── types/
│   └── index.ts                # TypeScript type definitions
├── public/                     # Static assets
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── next.config.js              # Next.js configuration
└── package.json
```

## 📜 License

This project is [MIT](./LICENSE) licensed.

Made with ❤️
