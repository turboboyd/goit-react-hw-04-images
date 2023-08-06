import React, { useState } from 'react';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Modal } from '../Modal/Modal';
import PropTypes from 'prop-types';

export function ImageGallery(props) {
  const [showModal, setShowModal] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const [alt, setAlt] = useState('');

    const openModal = (imageUrl, tags) => {
      setShowModal(true);
      setSelectedImageUrl(imageUrl);
      setAlt(tags);
    };

    const closeModal = () => {
      setShowModal(false);
      setSelectedImageUrl('');
    };

  return (
    <>
      <ul className={css.ImageGallery}>
        {props.images.map(({ id, largeImageURL, tags }) => (
          <ImageGalleryItem
            openModal={openModal}
            key={id}
            src={largeImageURL}
            alt={tags}
            onClick={() => openModal(largeImageURL, tags)}
          />
        ))}
      </ul>
      {showModal && (
        <Modal imageUrl={selectedImageUrl} alt={alt} onClose={closeModal} />
      )}
    </>
  );
}


ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
};