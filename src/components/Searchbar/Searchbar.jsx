import React, { Component } from 'react';
import { earchEmpty } from '../Notifix/Notifix';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    searchName: '',
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };


  handleInputChange = e => {
    const value = e.currentTarget.value;

    this.setState({ searchName: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const searchName = this.state.searchName;
    if (searchName.trim() === '') {
    return earchEmpty();
    } 

    this.props.onSubmit({
      searchName: searchName.toLowerCase(),
    });
    this.resetState();
  };

  resetState = () => {
    this.setState({ searchName: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchForm_button}>
            
          </button>

          <input
            className={css.SearchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchName}
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}
