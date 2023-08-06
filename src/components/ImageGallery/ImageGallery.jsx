import React, { Component } from 'react';
import css from './ImageGallery.module.css';
import {fetchImages} from '../../servises/api-images.js';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import {Modal} from '../Modal/Modal';
import { warnNoImages, noImagesFound, errorToastify } from '../Notifix/Notifix';
import PropTypes from 'prop-types';

  export class ImageGallery extends Component {
    state = {
      searchName: '',
      images: [],
      page: 1,
      loading: false,
      error: null,
      status: 'idle',
      showButton: false,
      showModal: false,
      selectedImageUrl: '',
      alt: '',
    };

    static propTypes = {
      searchName: PropTypes.string.isRequired,
    };

    componentDidUpdate(prevProps, prevState) {
      const prevName = prevProps.searchName;
      const newName = this.props.searchName;
      if (prevName !== newName) {
        this.setState({ status: 'pending' });
        const page = 1;
        setTimeout(() => {
          fetchImages(newName.searchName, page)
            .then(newImages => {
              if (newImages.hits.length === 0) {
                noImagesFound(newName);
                return this.setState({
                  status: 'idle',
                  loading: false,
                });
              }
              this.setState({
                images: newImages.hits,
                page: page + 1,
                status: 'resolved',
                loading: false,
                showButton: true,
              });

              if (Math.ceil(newImages.totalHits / 12) === page) {
                warnNoImages();
                this.setState({
                  showButton: false,
                });
              }
            })
            .catch(error =>
              this.setState({ error, status: 'rejected', loading: false })
            );
        }, 1000);
      }
    }

    handleLoadMore = () => {
      const page = this.state.page;
      const name = this.props.searchName.searchName;
      fetchImages(name, page)
        .then(newImages => {
          this.setState({
            images: [...this.state.images, ...newImages.hits],
            page: page + 1,
            status: 'resolved',
            loading: false,
          });
          if (Math.ceil(newImages.totalHits / 12) === page) {
            warnNoImages();
            this.setState({
              showButton: false,
            });
          }
        })
        .catch(error =>
          this.setState({ error, status: 'rejected', loading: false })
        );
    };

    openModal = (imageUrl, tags) => {
      this.setState({ showModal: true, selectedImageUrl: imageUrl, alt: tags });
    };

    closeModal = () => {
      this.setState({ showModal: false, selectedImageUrl: '' });
    };

    render() {
      const { images, status, showButton, showModal, selectedImageUrl, alt } =
        this.state;
      const { openModal, handleLoadMore, closeModal } = this;

      if (status === 'pending') {
        return <Loader />;
      }

      if (status === 'rejected') {
        errorToastify();
        return <div>An error has occurred, please try again!</div>;
      }

      if (status === 'resolved') {
        return (
          <>
            <ul className={css.ImageGallery}>
              {images.map(({ id, largeImageURL, tags }) => (
                <ImageGalleryItem
                  key={id}
                  src={largeImageURL}
                  alt={tags}
                  onClick={() => openModal(largeImageURL, tags)}
                />
              ))}
            </ul>
            {showButton && <Button onClick={handleLoadMore}>Load more</Button>}

            {showModal && (
              <Modal
                imageUrl={selectedImageUrl}
                alt={alt}
                onClose={closeModal}
              />
            )}
          </>
        );
      }
    }
  }
