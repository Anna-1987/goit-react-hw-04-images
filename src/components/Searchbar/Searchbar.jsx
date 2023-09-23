import React, { useState } from "react";
import css from './Searchbar.module.css';

export function Searchbar({onSubmit}) {
    
    const [searchQuery, setSearchQuery] = useState('');
    
   const handleChange = e => {
      setSearchQuery(e.currentTarget.value.toLowerCase());
      };

    const handleSubmit = e => {
        e.preventDefault();
        if (searchQuery.trim() === '') {
          return alert('Please enter something :)');
        }
        onSubmit(searchQuery);
        setSearchQuery({ searchQuery: '' });
      };
    
    return (
        <header className={css.search__form}>
        <form className={css.form} onSubmit={handleSubmit}>
          <button type="submit" className={css.search__btn}>
            <span className={css.button__label}>Search</span>
          </button>
      
          <input
            className={css.input}
            type="text"
            // autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
            onChange={handleChange}
          />
        </form>
      </header>
    )
 }

   
