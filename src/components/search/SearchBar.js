//input component för att kunna söka ett recept efter kategorin
import React, {useState}  from 'react'

const SearchBar = ({ onSearch }) => {

    const [query, setQuery] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value);
    };
  
    return (
    <div className='search-bar w-[350px]'>
        <input
            type='text'
            placeholder='sök efter kategorin...'
            value={query}
            onChange={handleChange}
            className='border p-2 rounded-md w-full max-w-md outline-none'
        />
    </div>
  )
}

export default SearchBar