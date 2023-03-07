import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalWindow } from './Modal.styled';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEsc);
  }

  handleBackdrop = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  handleEsc = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { currentImageUrl, currentImageDescription, onClose } = this.props;

    return createPortal(
      <Overlay onClick={this.handleBackdrop}>
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
}
