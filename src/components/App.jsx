import React, { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from '../servises/api-images';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { warnNoImages, noImagesFound, errorToastify } from './Notifix/Notifix';
import PropTypes from 'prop-types';
import css from './App.module.css';
import { ToastContainer } from 'react-toastify';

export function App() {
  const [request, setRequest] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [loder, setLoder] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = ({ query }) => {
    setRequest(query.toLowerCase());
    setImages([]);
    setPage(1);
  };

  useEffect(() => {
    if (!request) {
      return;
    }
    setLoder(true);
    fetchImages(request, page)
      .then(newImages => {
        if (newImages.hits.length === 0) {
          noImagesFound(request);
          setStatus('idle');
          setLoading(false);
          return;
        }
        setLoder(false);
        setImages([...images, ...newImages.hits]);
        setStatus('resolved');
        setLoading(false);
        setShowButton(true);
        setRequest(request);
        if (Math.ceil(newImages.totalHits / 12) === page) {
          warnNoImages();
          setShowButton(false);
        }
      })
      .catch(error => {
        setStatus('rejected');
        setLoading(false);
        setError(error);
      });
  }, [request, page]);

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleSubmit} />

      {loder && <Loader />}
      {status === 'rejected' && (
        <>
          {errorToastify()}
          <div>An error has occurred, please try again!</div>
        </>
      )}
      {status === 'resolved' && (
        <>
          <ImageGallery images={images} />
          {showButton && <Button onClick={handleLoadMore}>Load more</Button>}
        </>
      )}
      <ToastContainer />
    </div>
  );
}
