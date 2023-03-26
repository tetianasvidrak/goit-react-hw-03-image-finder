import React from 'react';
import css from './ImageGalleryItem.module.css';
import Modal from '../Modal';

class ImageGalleryItem extends React.Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  render() {
    return (
      <>
        <li className={css['gallery-item']}>
          <div className={css['image-container']}>
            <img
              className={css.image}
              src={this.props.smallImage}
              alt="small"
              onClick={() => this.toggleModal()}
            />
          </div>
        </li>
        {this.state.showModal ? (
          <Modal
            onClose={this.toggleModal}
            children={
              <img
                className={css['modal-image']}
                src={this.props.largeImage}
                alt="large"
              />
            }
          />
        ) : undefined}
      </>
    );
  }
}

export default ImageGalleryItem;
