import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export function Modal(props) {
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  })

  const handleKeyDown = event => {
    if (event.key === 'Escape') {
      props.onClose();
    }
  };

  const handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      props.onClose();
    }
  };

    // const { imageUrl, alt } = props;
    return createPortal(
      <div className={css.Overlay} onClick={handleOverlayClick}>
        <div className={css.Modal}>
          <img className={css.imageUrl} src={props.imageUrl} alt={props.alt} />
        </div>
      </div>,
      modalRoot
    );

}

Modal.protoType = {
    imageUrl: PropTypes.string.isRequired,
    alt: PropTypes.string,
    onClose: PropTypes.func.isRequired,
}