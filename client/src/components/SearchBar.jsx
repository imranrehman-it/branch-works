import React, { useEffect } from 'react';
import { useGlobalState } from '../utils/GlobalStateContext';
import searchNodeByName from '../utils/searchNode';
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ treeHead, employees }) => {
  const [search, setSearch] = React.useState('');
  const { searchPath, setSearchPath, nodes } = useGlobalState();
  const [searchFailed, setSearchFailed] = React.useState(false);
  const [possibleResults, setPossibleResults] = React.useState([]);

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
    setPossibleResults(employees.data.filter((employee) => employee.Name.toLowerCase().includes(e.target.value.toLowerCase())));
    console.log('possibleResults', possibleResults);
    if(searchFailed){
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
      setSearch(''); // Clear the search state if search is successful
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
      {search.length > 0 && (
        <div className='flex flex-col w-full h-fit gap-2 bg-white shadow-lg rounded-md py-2'>
          {possibleResults.slice(0, 5).map((result, index) => (
            <div key={index} onClick={() => setSearch(result.Name)} className='flex flex-col cursor-pointer mb-2 hover:bg-slate-100'>
              <div className='flex flex-row w-full justify-between p-1'>
                <p className='text-black text-nowrap text-sm font-semibold px-2'>{result.Name}</p>
                <p className='text-black bg-red-50 rounded-md text-nowrap text-[0.6rem] font-semibold px-2 h-fit'>Lvl:{result['level']}</p>
              </div>
              <p className='text-black  text-xs px-2'>{result['Job Title']}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SearchBar;
