import React, { useEffect } from 'react'
import { useGlobalState } from '../utils/GlobalStateContext'
import searchNodeByName from '../utils/searchNode'

const SearchBar = ({treeHead}) => {
  const [search, setSearch] = React.useState('')
  const { searchPath, setSearchPath } = useGlobalState()


  useEffect(() => {
    console.log('treehead', treeHead)
    }, [treeHead])

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    console.log('search', search)
    setSearchPath(searchNodeByName(treeHead, search)) 
    }
  return (
    <div className='w-full h-fit bg-white shadow-lg rounded-md p-2'>
        <input onChange={(e)=>handleSearch(e)}  type='text' className='w-full h-fit rounded-md p-2 shadow-md outline-dotted outline-2 outline-green-300' placeholder='Search...'/>
        <button onClick={handleSearchSubmit} className='w-full h-fit bg-green-300 rounded-md p-2 mt-2 shadow-md'>Search</button>
    </div>
  )
}

export default SearchBar