import React, { useState } from 'react';
import { earchEmpty } from '../Notifix/Notifix';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export function Searchbar(props) {

  const [query, setQuery] = useState('');
  
  const handleInputChange = e => {
    if (query === e.currentTarget.value) {
      setQuery('');
      return;
    }
    setQuery(e.currentTarget.value);
  };

  const handleSubmit = e => {
    console.log('e: ', e);
    e.preventDefault();
    if (query.trim() === '') {
      return earchEmpty();
    }
    props.onSubmit({
      query,
    });
    setQuery('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchForm_button}></button>

        <input
          className={css.SearchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
}
