import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalWindow } from './Modal.styled';
import PropTypes from 'prop-types';

export default function Modal({
  onClose,
  currentImageUrl,
  currentImageDescription,
}) {
  useEffect(() => {
    const handleEscape = event => event.code === 'Escape' && onClose();

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleBackdrop = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdrop}>
      <ModalWindow>
        <button
          type="button"
          onClick={onClose}
          style={{ position: 'absolute' }}
        >
          Close
        </button>
        <img
          src={currentImageUrl}
          alt={currentImageDescription}
          loading="lazy"
        />
      </ModalWindow>
    </Overlay>,
    document.querySelector('#modal-root')
  );
}

Modal.propTypes = {
  currentImageUrl: PropTypes.string,
  currentImageTag: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};
