import React from 'react'
import './Search.css'
import Cancel from '../../../assets/Svg/Cancel'

const Search = () => {
  return (
    <div className="search-container">
    <div className="search-wrapper">
      <input
        type="text"
        className="search"
        placeholder="Search categories"
        // value={search}
        // onChange={(event) => handleChange(event)}
      />
     
        <div className="cancel-icon" >
          <Cancel/>
        </div>
      
    </div>
    {/* {search.length !== 0 && (
      <div className="search-results">
        {filterUsers.length > 0 ? (
          <div>{filterUsers[0]?.username}</div>
        ) : (
          <div>No results</div>
        )}
      </div>
    )} */}
  </div>
  )
}

export default Search
