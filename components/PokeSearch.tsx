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
    const debouncedUrlUpdate = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (deferredQuery.trim().length > 0) {
        params.set("q", deferredQuery.trim());
      } else {
        params.delete("q");
      }

      router.push(`${pathname}?${params.toString()}`);
    }, 1000);

    return () => clearTimeout(debouncedUrlUpdate);
  }, [deferredQuery]);

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search Pokémon..."
      className="px-4 py-2 border rounded-l-md w-full max-w-md border-gray-200 dark:border-gray-700 focus:border-gray-200 focus:dark:border-gray-700 outline-none rounded-lg"
    />
  );
}
