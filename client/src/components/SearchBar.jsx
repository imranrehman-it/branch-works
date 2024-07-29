import React, { useState, useEffect } from 'react';
import { useGlobalState } from '../utils/GlobalStateContext';
import { FaSearch } from "react-icons/fa";
import searchNodeByName  from '../utils/searchNode';

const SearchBar = ({ treeHead }) => {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(search); // State for debounced value
  const { setSearchPath } = useGlobalState();
  const [searchFailed, setSearchFailed] = useState(false);
  const [possibleResults, setPossibleResults] = useState([]);

  

  useEffect(() => {
    console.log('treeHead', treeHead);
  }, [treeHead]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000); // 2 seconds delay

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    if (debouncedSearch) {
      setPossibleResults([]);
      if (treeHead) {
        filterPossibleResults(treeHead);
      }
    }
  }, [debouncedSearch]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearchSubmit(event);
    }
  };

  const filterPossibleResults = (node) => {
    if (!node) {
      return;
    }

    if (node.Name && node.Name.toLowerCase().includes(debouncedSearch.toLowerCase())) {
      setPossibleResults((currentResults) => [...currentResults, node]);
    }

    if (!node.children) {
      return;
    }

    node.children.forEach((child) => {
      filterPossibleResults(child); 
    });
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (searchFailed) {
      setSearchFailed(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('search', search);
    const results = searchNodeByName(treeHead, search);
    setSearchPath(results);
    if (results.length === 0) {
      setSearchFailed(true);
    } else {
      setSearchFailed(false);
      setSearch(''); 
    }
  };

  return (
    <>
      <div className={`flex flex-row align-middle w-full h-fit bg-white shadow-lg rounded-md gap-4 outline-dotted outline-2 ${searchFailed ? 'outline-red-500' : 'outline-blue-300'}`}>
        <input
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          type='text'
          value={search}
          className='w-full h-fit rounded-md p-2 focus:outline-none'
          placeholder='Search...'
        />
        <FaSearch onClick={handleSearchSubmit} className='h-fit text-[3rem] text-blue-500 p-2 cursor-pointer' />
      </div>
      {possibleResults.length > 0 && (
        <div className='flex flex-col w-full h-fit gap-2 bg-white shadow-lg rounded-md py-2'>
          {possibleResults.slice(0, 5).map((result, index) => (
            <div key={index} onClick={() => setSearch(result.Name)} className='flex flex-col cursor-pointer mb-2 hover:bg-slate-100'>
              <div className='flex flex-row w-full justify-between p-1'>
                <p className='text-black text-nowrap text-sm font-semibold px-2'>{result.Name}</p>
                <p className='text-black bg-red-50 rounded-md text-nowrap text-[0.6rem] font-semibold px-2 h-fit'>Lvl:{result['level']}</p>
              </div>
              <p className='text-black text-xs px-2'>{result['Job Title']}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SearchBar;
