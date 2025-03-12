"use client";

import { useState, useEffect, useDeferredValue } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function PokeSearch({
  initialSearch = "",
}: {
  initialSearch?: string;
}) {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const deferredQuery = useDeferredValue(searchTerm);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (deferredQuery.trim()) {
      params.set("q", deferredQuery.trim());
    } else {
      params.delete("q");
    }

    router.push(`${pathname}?${params.toString()}`);
  }, [deferredQuery]);

  return (
    <input
      type="text"
      autoFocus
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search Pokémon..."
      className="px-4 py-2 border-none rounded-l-md w-full max-w-md background-none"
    />
  );
}
