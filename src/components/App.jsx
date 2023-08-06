import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import css from './App.module.css'
import { ToastContainer } from 'react-toastify';


export class App extends Component {
  state = {
    searchName: '',
  };


  handleSubmit = searchName => {
    this.setState({ searchName: searchName });
  };

  render() {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery searchName={this.state.searchName} />
        <ToastContainer />
      </div>
    );
  }
}
