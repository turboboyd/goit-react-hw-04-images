import React, { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from '../servises/api-images';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { warnNoImages, noImagesFound, errorToastify } from './Notifix/Notifix';
import css from './App.module.css';
import { ToastContainer } from 'react-toastify';


export function App() {
  const [request, setRequest] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [loder, setLoder] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [errore, setError] = useState('');

  const handleSubmit = ({ query }) => {
    if (query === request) {
      return;
    }
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
          console.log('0: ', 0);
          noImagesFound(request);
          setLoder(false);
          setShowButton(false);
          setStatus('idle');
          return;
        }
        setLoder(false);
        setImages(prevState => [...prevState, ...images.hits]);
        setStatus('resolved');
        setLoder(false);
        setShowButton(true);
        setRequest(request);
        if (Math.ceil(newImages.totalHits / 12) === page) {
          warnNoImages();
          setLoder(false);
          setShowButton(false);
        }
      })
      .catch(error => {
        setStatus('rejected');
        setLoder(false);
        setError(error);
        console.log(errore);
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
