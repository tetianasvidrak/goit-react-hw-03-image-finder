import React from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component {
  handleKeydown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleOutsideClick = e => {
    if (e.target.id === 'modal-overlay') {
      this.props.onClose();
    }
  };
  componentDidMount() {
    window.addEventListener('click', this.handleOutsideClick);
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleOutsideClick);
    window.removeEventListener('keydown', this.handleKeydown);
  }

  render() {
    return createPortal(
      <div id="modal-overlay" className={css.overlay}>
        <div className={css.modal}>{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
