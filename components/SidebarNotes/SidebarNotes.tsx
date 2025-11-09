
'use client';
import { useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import css from "../SearchBox/SearchBox.module.css"; 
import type { ChangeEvent } from "react";

const SearchBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const initialQuery = searchParams.get('search') || '';
  const [query, setQuery] = useState(initialQuery);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);

    const newParams = new URLSearchParams(searchParams.toString());
    
    if (newQuery) {
      newParams.set('search', newQuery);
    } else {
      newParams.delete('search');
    }
    
    newParams.set('page', '1');

    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <div className={css.searchBarContainer}>
      <input
        value={query}
        onChange={handleSearchChange}
        className={css.input}
        type="text"
        placeholder="Search notes"
      />
    </div>
  );
};

export default SearchBar;