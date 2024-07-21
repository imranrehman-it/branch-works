import React, { useEffect } from 'react';
import { useGlobalState } from '../utils/GlobalStateContext';
import searchNodeByName from '../utils/searchNode';
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ treeHead }) => {
  const [search, setSearch] = React.useState('');
  const { searchPath, setSearchPath, nodes } = useGlobalState();
  const [searchFailed, setSearchFailed] = React.useState(false);

  useEffect(() => {
    console.log('treehead', treeHead);
  }, [treeHead]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearchSubmit(event);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
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
      setSearch(''); // Clear the search state if search is successful
    }
  };

  return (
    <div className={`flex flex-row align-middle w-full h-fit bg-white shadow-lg rounded-md gap-4 outline-dotted outline-2 ${searchFailed ? 'outline-red-500' : 'outline-blue-300'}`}>
      <input
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
        outline='none'
        type='text'
        value={search}
      className='w-full h-fit rounded-md p-2 focus:!outline-none'
        placeholder='Search...'
      />
      <FaSearch onClick={handleSearchSubmit} className='h-fit text-[3rem] text-blue-500 p-2 cursor-pointer' />
    </div>
  );
};

export default SearchBar;
